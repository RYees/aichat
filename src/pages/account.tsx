//@ts-nocheck
import React, { useEffect, useState } from "react";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { useSession } from "next-auth/react";
import ManageSubscriptionButton from "~/components/Account/ManageSubscriptionButton";
import ManageCreatorButton from "~/components/Account/ManageCreatorButton";
import axios from "axios";
import { useRouter } from "next/router";
import Header from "~/components/Header/Header";
import SubscriptionStatusModal from '~/components/SubscriptionStatusModal';


interface User {
  name: string;
  email: string;
}

interface User {
  plan: Plan[];
}

interface Plan {
  name: string;
}

const Account = () => {
  const router = useRouter();
  const [userallplan, setAll] = useState<User>();
  const [iscreator, setCreator] = useState();
  const { data: session } = useSession();
  const user = session?.user;
  const { userId, characterId, subscription } = router.query;
  // const plandetail = JSON.parse(subscription);

  let plandetail;
  if (Object.keys(router.query).length !== 0) {
    if (typeof subscription === "string") {
      plandetail = JSON.parse(subscription);
    }
    //plandetail = JSON.parse(sessionStorage.getItem('subscription'))
    console.log("life", plandetail);
  }
  // useEffect(()=>{
  //   if(!session){
  //     router.push('/')
  //   }
  // },[])

  // if (!session){
  //   return redirect('/signin');
  // }

  const updateName = async (formData: FormData) => {
    //   'use server';

    //   const newName = formData.get('name') as string;
    //   const supabase = createServerActionClient<Database>({ cookies });
    //   const session = await getSession();
    //   const user = session?.user;
    //   const { error } = await supabase
    //     .from('users')
    //     .update({ full_name: newName })
    //     .eq('id', user?.id);
    //   if (error) {
    //     console.log(error);
    //   }
    revalidatePath("/account");
  };

  const updateEmail = async (formData: FormData) => {
    // 'use server';

    // const newEmail = formData.get('email') as string;
    // const supabase = createServerActionClient<Database>({ cookies });
    // const { error } = await supabase.auth.updateUser({ email: newEmail });
    // if (error) {
    //   console.log(error);
    // }
    revalidatePath("/account");
  };

  const findCreator = async () => {
    const response = await axios.get(`/api/characters?userId=${user?.id}`);
    console.log("res", response?.data);
    const characters = response?.data.characters;

    const creators = characters.filter(
      (character) => character.stripeAccountId
    );
    console.log("Creators:", creators);

    // Check if the user is a creator
    if (characters && characters.length > 0) {
      const creators = characters.filter(
        (character) => character.stripeAccountId
      );
      if (creators.length > 0) {
        console.log("value", characters);
        setCreator(creators);
      } else {
        setCreator(false);
      }
    } else {
      setCreator(false);
    }

    console.log(iscreator);
  };

  const userplan = async () => {
    const response = await axios.get(`/api/fetchUserData?userId=${user?.id}`);
    console.log("mistakes", response.data, user?.id);
    setAll(response.data);
  };

  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
  const openModal = () => setShowModal(true);
  console.log("querydata", userId, characterId)
  // const userplan = async() => {
  //   const response = await axios.get(`/api/fetchUserData?userId=${userId}`)
  //  // console.log("mistakes", response.data, user?.id)
  //   setAll(response.data)    
  // }
  
  const [isStatus, setStatus] = useState();
  const userplanstatus = async() => {
    const response = await axios.post(`/api/planStatus?userId=${user?.id}&characterId=${characterId}`)
   // console.log("userplans", response.data, user?.id)
    setStatus(response.data[0])    
  }

  useEffect(() => {
    userplanstatus()
  }, [isStatus])

  // useEffect(() => {
  //   openModal()
  // }, [])

  useEffect(() => {
    userplan();
    findCreator();
  }, [user]);

  return (
    <>
      <Header />
      <section className="mb-32  h-full">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:pt-24 lg:px-8">
          <div className="sm:align-center sm:flex sm:flex-col">
            <h1 className="text-4xl font-extrabold  text-black sm:text-center sm:text-6xl">
              Account
            </h1>
            {/* <p className="max-w-2xl m-auto mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl">
      We partnered with Stripe for a simplified billing.
    </p> */}
          </div>
          <ManageSubscriptionButton />

          {iscreator &&
            iscreator.length > 0 &&
            iscreator.map((item: any, index: any) => (
              <ManageCreatorButton key={index} data={item} />
            ))}
        </div>
        {plandetail !== undefined ? (
          <div className="p-4 text-black">
            <Card
              title="Your Plan"
              description={
                plandetail
                  ? `You are currently on the ${plandetail[0]?.plan?.name} plan.`
                  : "You are not currently subscribed to any plan."
              }
              footer={<ManageSubscriptionButton />}
            >
              <div className="mb-4 mt-8 text-xl font-semibold">
                {plandetail ? (
                  `${plandetail[0]?.plan?.price}/${plandetail[0]?.plan?.interval}`
                ) : (
                  <Link href="/">Choose your plan</Link>
                )}
              </div>

              {/* {iscreator?.character.map((item: any, index: any) =>
                iscreator?.character.length !== 0 &&
                item.id === parseInt(characterId) ? (
                  <Card
                    title="Creator"
                    description=""
                    footer={<ManageCreatorButton data={item.stripeAccountId} />}
                  ></Card>
                ) : null
              )} */}

            {/*               
              {iscreator &&
                iscreator.length > 0 &&
                iscreator.map((item: any, index: any) => (
                  <ManageCreatorButton
                    key={index}
                    data={item.stripeAccountId}
                  />
                ))} */}
            </Card>
            <Card
              title="Your Name"
              description="Please enter your full name, or a display name you are comfortable with."
              footer={
                <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
                  {/* <p className="pb-4 sm:pb-0 text-yellow-200">64 characters maximum</p> */}
                  <button type="submit" form="nameForm" disabled={true}>
                    {/* WARNING - In Next.js 13.4.x server actions are in alpha and should not be used in production code! */}
                    {/* Update Name */}
                  </button>
                </div>
              }
            >
              <div className="mb-4 mt-8 text-xl font-semibold">
                <form id="nameForm" action={updateName}>
                  <input
                    type="text"
                    name="name"
                    className="w-1/2 rounded-md bg-zinc-800 p-3 text-zinc-200"
                    defaultValue={
                      plandetail ? plandetail[0]?.user?.name ?? "" : null
                    }
                    placeholder="Your name"
                    maxLength={64}
                  />
                </form>
              </div>
            </Card>
            <Card
              title="Your Email"
              description="Please enter the email address you want to use to login."
              footer={
                <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
                  <p className="pb-4 text-yellow-200 sm:pb-0">
                    We will email you to verify the change.
                  </p>
                  <button type="submit" form="emailForm" disabled={true}>
                    {/* WARNING - In Next.js 13.4.x server actions are in alpha and should not be used in production code! */}
                    Update Email
                  </button>
                </div>
              }
            >
              <div className="mb-4 mt-8 text-xl font-semibold">
                <form id="emailForm" action={updateEmail}>
                  <input
                    type="text"
                    name="email"
                    className="w-1/2 rounded-md bg-zinc-800 p-3"
                    defaultValue={
                      plandetail ? plandetail[0]?.user.email ?? "" : null
                    }
                    placeholder="Your email"
                    maxLength={64}
                  />
                </form>
              </div>
            </Card>
          </div>
        ) : (
          <div className="p-4 ">
            <Card
              title="Your Plan"
              description={
                userallplan
                  ? `You are currently on the ${userallplan?.plan.length} plans.`
                  : "You are not currently subscribed to any plan."
              }
            >
              {/* {userallplan?.plan.map((item, index) => (
                <div className="mb-4 mt-8 flex flex-row text-xl font-semibold">
                </div>
              ))} */}
            </Card>
            <Card
              title="Your Name"
              description="Please enter your full name, or a display name you are comfortable with."
              footer={
                <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
                  {/* <p className="pb-4 sm:pb-0 text-yellow-200">64 characters maximum</p> */}
                  <button type="submit" form="nameForm" disabled={true}>
                    {/* WARNING - In Next.js 13.4.x server actions are in alpha and should not be used in production code! */}
                    {/* Update Name */}
                  </button>
                </div>
              }
            >
              <div className="mb-4 mt-8 text-xl font-semibold">
                <form id="nameForm" action={updateName}>
                  <input
                    type="text"
                    name="name"
                    className="w-1/2 rounded-md bg-zinc-800 p-3 text-zinc-200"
                    defaultValue={
                      userallplan ? userallplan?.name ?? "" : undefined
                    }
                    placeholder="Your name"
                    maxLength={64}
                  />
                </form>
              </div>
            </Card>
            {/* <Card
                  title="Your Email"
                  description="Please enter the email address you want to use to login."
                  footer={
                    <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
                      <p className="pb-4 sm:pb-0 text-yellow-200">
                        We will email you to verify the change.
                      </p>
                      <button
                        type="submit"
                        form="emailForm"
                        disabled={true}
                      >
                        Update Email
                      </button>
                    </div>
                  }
                >
                  <div className="mt-8 mb-4 text-xl font-semibold">
                    <form id="emailForm" action={updateEmail}>
                      <input
                        type="text"
                        name="email"
                        className="w-1/2 p-3 rounded-md bg-zinc-800"
                        defaultValue={userallplan? userallplan?.email ?? '': undefined}
                        placeholder="Your email"
                        maxLength={64}
                      />
                    </form>
                  </div>
                </Card>  */}
          </div>
        )}

{/* <SubscriptionStatusModal
          isStatus={isStatus?.status}
          show={showModal}
          onClose={closeModal}
        /> */}
      </section>
    </>
  );
};

interface Props {
  title: string;
  description?: string;
  footer?: ReactNode;
  children: ReactNode;
}

function Card({ title, description, footer, children }: Props) {
  console.log(footer);
  return (
    <div className="p m-auto my-8 w-full max-w-3xl rounded-md border border-zinc-700">
      <div className="px-5 py-4">
        <h3 className="mb-1 text-2xl font-medium">{title}</h3>
        <p className="">{description}</p>
        {children}
      </div>
      <div className="rounded-b-md border-t border-zinc-700 bg-zinc-200 p-4 ">
        {footer}
      </div>
    </div>
  );
}

export default Account;
