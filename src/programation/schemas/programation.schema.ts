import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProgramationDocument = Programation & Document;

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

@Schema()
export class Programation {
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



export const ProgramationSchema = SchemaFactory.createForClass(Programation);