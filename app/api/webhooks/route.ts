import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { prisma } from "@/lib/prisma";
 
export async function POST(req: Request) {
 
    // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET
    
    if (!WEBHOOK_SECRET) {
        throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
    }
    
    // Get the headers
    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");
    
    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occured -- no svix headers', {
        status: 400
        })
    }
    
    // Get the body
    const payload = await req.json()
    const body = JSON.stringify(payload);
    
    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET);
    
    let evt: WebhookEvent
    
    // Verify the payload with the headers
    try {
        evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
        }) as WebhookEvent
    } catch (err) {
        console.error('Error verifying webhook:', err);
        return new Response('Error occured', {
        status: 400
        })
    }
 
    // Get the ID and type
    const eventType = evt.type;
    
    console.log(`Webhook with and ID of ${evt.data.id} and type of ${eventType}`)
    // console.log('Webhook body:', body)

    if(eventType === "user.created") {
        console.log("User created webhook received")
        if(!payload.data.username)
            return new Response('Error -- No username', { status: 400 })
        if(!payload.data.id)
            return new Response('Error -- No user id', { status: 400 })

        try {
            const response = await prisma.user.create(
                {data: {
                    id: payload.data.id,
                    username: payload.data.username,
                    firstName: payload.data.firstName,
                    lastName: payload.data.lastName,
                    profileImageUrl: payload.data.profileImageUrl,
                    createdAt: payload.data.createdAt,
                    updatedAt: payload.data.updatedAt,
                    }
                }
            )
            return new Response(`Created new user ${response.username}`, { status: 200 })
        } catch (error) {
            console.error('Error creating user:', error);
            return new Response('Error occured', {
                status: 400
            })
        }
    
    } else if(eventType === "user.updated") {
        console.log("User updated webhook received")
        if(!payload.data.id)
            return new Response('Error -- No user id', { status: 400 })

        try {
            const response = await prisma.user.update({
                where: { id: payload.data.id },
                data: {
                    username: payload.data.username,
                    firstName: payload.data.firstName,
                    lastName: payload.data.lastName,
                    profileImageUrl: payload.data.profileImageUrl,
                    createdAt: payload.data.createdAt,
                    updatedAt: payload.data.updatedAt,
                },
            })
            return new Response(`Updated user ${response.username}`, { status: 200 })
        } catch (error) {
            console.error('Error updating user:', error);
            return new Response('Error occured', {
                status: 400
            })
        }
    
    } else if(eventType === "user.deleted") {
        console.log("User deleted webhook received")
        if(!payload.data.id)
            return new Response('Error -- No user id', { status: 400 })

        try {
            const response = await prisma.user.delete({
                where: { id: payload.data.id }
            })
            return new Response(`Deleted user ${response.username}`, { status: 200 })
        } catch (error) {
            console.error('Error deleting user:', error);
            return new Response('Error occured', {
                status: 400
            })
        }
    } else {
        console.log("Unknown webhook received")
    }
 
  return new Response('', { status: 200 })
}
 