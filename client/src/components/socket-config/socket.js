import io from 'socket.io-client';

export class socketConfig {

    constructor(componentFn, table) {
        this.data = {}
        this.componentFn = componentFn;
        this.socket = io(process.env.REACT_APP_URL_IO, { path: "/api/socket" });
        this.socket.emit('subscribe', table);
    }

    newMessage = (msg, table) => {
        console.log(msg, table)
        this.socket.emit("send message", { msg, table })
    }

}