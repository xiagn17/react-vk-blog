import openSocket from 'socket.io-client';


const socket = openSocket();

const socketHandler = (component) => {
    socket.on('new_post', () => {
        component.setState({
            newPost: true
        });
    });
};

export default socketHandler;