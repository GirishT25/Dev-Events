import EventCard from "@/components/EventCard";
import Event from "@/database/event.model";
import connectDB from "@/lib/mongodb";
import { stat } from "fs";
import { NextRequest, NextResponse } from "next/server";
import {v2 as cloudinary} from 'cloudinary';

export async function POST(req : NextRequest){
    try {

        await connectDB();
        const fromData = await req.formData();

        let event;

        try {
            event = Object.fromEntries(fromData);

        } catch (error) {
            return NextResponse.json({message : "Invalid form data"}, {status : 400});
        }

        const file = fromData.get('image') as File;
        if(!file){
            return NextResponse.json({
                message : "Image file is required",
                status : 400
            })
        }

        let tags = JSON.parse(fromData.get('tags') as string);
        let agenda = JSON.parse(fromData.get('agenda') as string);


        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise((resolve , reject) =>{
            cloudinary.uploader.upload_stream({
                resource_type : 'image',
                folder : 'dev-events',
            }, (error , result) =>{
                if(error) reject(error);
                else resolve(result);
            }).end(buffer);
        })

        event.image = (uploadResult as {secure_url : string}).secure_url;

        const eventCreatedAt = await Event.create({
            ...event,
            tags : tags,
            agenda : agenda,
        });
        return NextResponse.json({eventCreatedAt}, {status : 201});

    } catch (e) {
        return NextResponse.json({message : "Internal Server Error" , error : e instanceof Error ? e.message : 'Unknown error'} , {status : 500});
    }
}

export async function GET(req : NextRequest){

    try {
        
        await connectDB();
        const events =  await Event.find().sort({createdAt : -1});
        return NextResponse.json({events} , {status : 200});
    } catch (e) {
        console.error("Error fetching events:", e);
        return NextResponse.json({message : "Error in fetching the Events ", error : e    },{status : 400});
    
    }
    
}