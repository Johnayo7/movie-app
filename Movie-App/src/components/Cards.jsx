import { useState } from "react";
import Button from './Button'

function Card(props) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className={`relative w-[200px] mb-[10px] h-[200px] pt-[282px] rounded-md flex-col justify-end items-center flex bg-cover bg-center transition-all duration-100 delay-200 z-20`}
      style={{ backgroundImage: `url(${props.image})` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    id = {props.id}
    >
      {isHovered && (
        <div
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-200 opacity-100`}
        >
          <div className="px-6 h-full w-full pb-4 bg-black bg-opacity-10 rounded-md rounded-br-md backdrop-blur-[2px] flex-col justify-end items-start gap-2 inline-flex">
            <Button
              title={"Details"}
              text={"white"}
              bg={"#F9C209"}
              type={"submit"}
              onClick={() => props.onClick && props.onClick(props.id)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;
