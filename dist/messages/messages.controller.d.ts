import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
export declare class MessagesController {
    private messagesService;
    constructor(messagesService: MessagesService);
    send(userId: string, dto: CreateMessageDto): Promise<{
        sender: {
            nama: string;
            avatarUrl: string | null;
            id: string;
        };
        receiver: {
            nama: string;
            avatarUrl: string | null;
            id: string;
        };
    } & {
        id: string;
        createdAt: Date;
        isi: string;
        senderId: string;
        receiverId: string;
    }>;
    inbox(userId: string): Promise<{
        sender: {
            nama: string;
            avatarUrl: string | null;
            id: string;
        };
        lastMessage: string;
        preview: string;
        updatedAt: Date;
    }[]>;
    thread(userId: string, otherId: string): Promise<({
        sender: {
            nama: string;
            avatarUrl: string | null;
            id: string;
        };
        receiver: {
            nama: string;
            avatarUrl: string | null;
            id: string;
        };
    } & {
        id: string;
        createdAt: Date;
        isi: string;
        senderId: string;
        receiverId: string;
    })[]>;
}
