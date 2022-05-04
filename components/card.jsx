import Link from "next/link";
import { motion } from "framer-motion";

const Card = ({ title, image, id }) => {
  return (
    <Link href={`/anime/${id}`} passHref>
      <a className="outline-none border-0">
        <motion.div
          className="rounded-xl card shadow"
          style={{ 
              backgroundImage: `url(${image})`, 
              backgroundRepeat: 'no-repeat',
              backgroundSize: "cover"
            }}

            whileHover={{
                scale: 1.025,
            }}
        
        layoutId={`anime_${id}`}>
          <div className="w-full h-full pb-2 flex justify-center items-end rounded-xl bg-gradient-to-t from-amber-800 to-black/0">
            <h1 className="text-white text-lg text-center font-medium">
              {title}
            </h1>
          </div>
        </motion.div>
      </a>
    </Link>
  );
};

export default Card;
