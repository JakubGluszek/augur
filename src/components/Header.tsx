import { signOut } from "next-auth/react";
import Image from "next/image";
import React from "react";
import LoginView from "./LoginView";
import { HiOutlineColorSwatch } from "react-icons/hi";
import Themes from "./Themes";
import { trpc } from "../utils/trpc";
import { showNotification } from "@mantine/notifications";

interface Props {
  user: {
    id?: string | undefined;
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  } | undefined
}

const Header: React.FC<Props> = ({ user }) => {
  const deleteAccount = trpc.useMutation(["user.delete"])

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount.mutateAsync();
      showNotification({
        color: "green",
        message: "Account deleted"
      })
      signOut()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="navbar">
        <div className="navbar-start">
          <span className="text-xl font-semibold">Augur</span>
        </div>
        <div className="navbar-end gap-4 items-center">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost">
              <HiOutlineColorSwatch size={32} />
            </label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 gap-2 h-96 overflow-y-auto">
              <Themes />
            </ul>
          </div>
          {user
            ?
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="h-12 cursor-pointer flex items-center justify-center">
                <Image
                  className="rounded-md"
                  src={user.image ? user.image : "./default_avatar.png"}
                  alt={user.name ? user.name : "unknown user"}
                  width={48}
                  height={48}
                />
              </label>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <button
                    className="btn btn-ghost"
                    onClick={() => signOut()}
                  >
                    Logout
                  </button>
                </li>
                <li>
                  <button
                    className="btn btn-ghost"
                    onClick={() => handleDeleteAccount()}
                  >
                    Delete account
                  </button>
                </li>
              </ul>
            </div>
            :
            <label htmlFor="login-modal" className="btn modal-button">
              Login
            </label>
          }
        </div>
      </div >

      <input type="checkbox" id="login-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <LoginView />
          <div className="modal-action">
            <label htmlFor="login-modal" className="btn">Exit</label>
          </div>
        </div>
      </div>
    </>
  )
};

export default Header;
