import Link from 'next/link'

const Card = ({title, image, url}) => {
    return <Link href={url} passHref>
        <a className='outline-none border-0'>
            <div className='rounded-xl card shadow' style={{background: `url(${image}) no-repeat`, backgroundSize: 'cover'}}>
                <div className="w-full h-full pb-2 flex justify-center items-end rounded-xl bg-gradient-to-t from-amber-800 to-black/0">
                <h1 className='text-white text-lg text-center font-medium'>{title}</h1>
                </div>
            </div>
        </a>
    </Link>
}

export default Card