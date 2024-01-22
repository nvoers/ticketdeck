import Link from 'next/link';

export default function Button({link, text}: {link: string, text: string}){
        return(
        <div className="h-full flex justify-center">
            <Link
                href={link}
                prefetch={false} // workaround until https://github.com/vercel/vercel/pull/8978 is deployed
                className="btn btn-sm btn-accent btn-outline text-md"
            >
            {text}
            </Link>
        </div>
        );
}