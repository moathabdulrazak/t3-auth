import { GetServerSideProps, NextPage } from "next";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import { AppProps } from "next/app";
import { object } from "zod";

const SignIn: NextPage<{ providers: Record<string, unknown> }> = ({ providers }) => {
  return (
    <>
      <h1>Sign in</h1>
      <div>
  {Object.values(providers).map((provider: any) => {
    return (
      <button
      key={provider.id}
      onClick={() =>
        signIn(provider.id, {
          callbackUrl: process.env.NEXTAUTH_URL,
          method: "post",
        })
      }
    >
      Sign in with {provider.name}
    </button>
    )
  })}
</div>
    </>
  );
};

export default SignIn;

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
};
