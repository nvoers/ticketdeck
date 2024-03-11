"use client"
import { useQRCode } from 'next-qrcode';

export default function QRCode({info}: {info: string}) {
    const { SVG } = useQRCode();

    return(
        <SVG 
            text={info}
            options={{
                margin: 2,
                width: 300,
            }}
        />
    );
}