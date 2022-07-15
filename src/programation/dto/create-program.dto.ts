export class CreateProgramDto {
    datetime: Date = new Date();
    date: string;
    time: string;
    channel: Channel;
    program: Program;   
}