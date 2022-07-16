import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProgramationDocument = ProgramationView & Document;

@Schema()
class Program {
    name: string;
    category: string;
    url: string;
}
@Schema()
class Channel {
    name: string;
    category: {
        name: string,
        url: string
    }
}

class Programation {
    @Prop()
    datetime: Date;

    @Prop()
    date: string;

    @Prop()
    time: string;

    @Prop({
        default: new Date().toISOString()
    })
    createdAt: Date;
        
    @Prop()
    program: Program;
    
    @Prop()
    channel: Channel;
}

@Schema({collection: "next-programation"})
export class ProgramationView extends Programation {  

    @Prop()
    nextProgramation: Programation;
}



export const ProgramationSchema = SchemaFactory.createForClass(ProgramationView);