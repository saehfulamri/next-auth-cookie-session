"use server";

import { getIronSession } from "iron-session";
import { sessionOptions, SessionData, defaultSession } from "./lib";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

let username = "john";
let isPro = true;
let password = "123456";

export const getSession = async () => {
    const session = await getIronSession<SessionData>(
        cookies(),
        sessionOptions
    );

    if (!session.isLoggedIn) {
        session.isLoggedIn = defaultSession.isLoggedIn;
    }

    return session;
};
export const login = async (
    prevState: { error: undefined | string },
    formData: FormData
) => {
    const session = await getSession();

    const formUsername = formData.get("username") as string;
    const formPassword = formData.get("password") as string;

    // check user in the db
    // const user = await db.getUser({ username, password });

    if (formUsername !== username || formPassword !== password) {
        return { error: "Wrong Credentials!" };
    }

    session.userId = "1";
    session.username = formUsername;
    session.isPro = isPro;
    session.isLoggedIn = true;

    await session.save();
    redirect("/");
};
export const logout = async () => {
    const session = await getSession();
    session.destroy();
    redirect("/");
};
