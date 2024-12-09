import { Avatar, AvatarFallback, AvatarImage } from "keep-react";

export const MenuBar = ({ image }) => {
  return (
    <Avatar>
      <AvatarImage src="/default-avatar.svg" />
      <AvatarFallback>{image ? "" : "KR"}</AvatarFallback>
    </Avatar>
  );
};
