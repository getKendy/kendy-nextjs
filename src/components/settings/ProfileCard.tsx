"use client";
import sdk from "@/appwrite/sdk";
import { Models } from "appwrite";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import { useRouter } from "next/router";


const ProfileCard = () => {
    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
    const router = useRouter()

    useEffect(() => {
        (async () => {
            try {
                const userData = await sdk.getCurrentUser()
                if (userData) {
                    setUser(userData)
                } else {
                    setUser(null)
                }
            } catch (error) {
                setUser(null)
            }
        })()
    }, [])

    return (
        user && (
            <>
                <div className="flex gap-y-6 flex-wrap justify-center items-center">
                    <div className="flex w-full gap-x-4 items-center">
                        <div className="shrink-0 w-20">
                            <Avatar img="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
                        </div>
                        <div className="relative">
                            <p className="font-bold text-xl w-full mb-1">{user.name}</p>
                            <div className="text-[12px] p-0.5 inline-block rounded-md bg-gradient-to-tr from-primary to-secondary">
                                <button className="px-2 rounded-md font-bold bg-white text-slate-400">FREE</button>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-200/70 rounded-xl px-8 py-8 w-full flex gap-y-4 flex-wrap">
                        <div className="relative w-full">
                            <p className="text-sm text-gray-700">Display Name</p>
                            <p className="font-semibold">{user.name}</p>
                        </div>
                        <div className="relative w-full">
                            <p className="text-sm text-gray-700">Email Id</p>
                            <p className="font-semibold">{user.email}</p>
                        </div>
                        <div className="relative w-full">
                            <p className="text-sm text-gray-700">Phone Number</p>
                            <p className="font-semibold">{user.phone}</p>
                        </div>
                        <div className="relative w-full">
                            <p className="text-sm text-gray-700">Registration</p>
                            <p className="font-semibold">{user.registration}</p>
                        </div>
                    </div>
                    <div className="w-full flex justify-center">
                        <button
                            onClick={() => {
                                sdk.logout()
                                setUser(null)
                                router.reload()
                            }}
                            className="btn btn-outline"
                        >

                            Logout
                        </button>
                    </div>
                </div>
            </>
        )
    );
}

export default ProfileCard;