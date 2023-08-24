import React, { useEffect, useState } from "react";
import sdk from "@/appwrite/sdk";

type Props = {
  img: string;
  alt?: string;
}



const Avatar: React.FC<Props> = ({ img, alt }) => {
  const [avatar, setAvatar] = useState<URL | null>(null)

  useEffect(() => {
    (async () => {
      try {
        const avatarData = await sdk.getAvater()
        setAvatar(avatarData)
      } catch (error) {
        setAvatar(null)
      }
    })()
  }, [])

  return (
    <div className="rounded-full overflow-hidden w-full pt-[100%] relative">
      <div className="absolute inset-0">
        <img src={avatar?.href} alt={alt || img} />
      </div>
    </div>
  )
}

export default Avatar
