require('dotenv').config()

var address='https://192.168.43.9'

export const url = `${address ||'https://localhost' }:${process.env.VUE_APP_SOCKET_PORT || '3000'}`

export const STORE_ACTIONS = {
    
    joinRoom: 'joinRoom',
    setRooms: 'setRooms',
    changeRoom: 'changeRoom',
    leaveChat:'leaveChat',
    changeStatus: 'changeStatus',
    signUp:'signUp',
    signIn:'signIn'

}
export const WS_EVENTS = {
    joinPrivateRoom: 'joinPrivateRoom',
    joinRoom: 'joinRoom',
    leaveRoom: 'leaveRoom',
    publicMessage: 'publicMessage',
    leavePrivateRoom: 'leavePrivateRoom',
    leaveChat: 'leaveChat',
    changeStatus: 'changeStatus',
    privateMessage: 'privateMessage',
    privateMessagePCSignaling: 'privateMessagePCSignaling',
    PCSignalingConference: 'PCSignalingConference',
    conferenceInvitation: 'conferenceInvitation',
    joinConference: 'joinConference',
    leaveConference: 'leaveConference'
}

export const STATUS_OPTIONS = {
    available: 'available',
    absent: 'absent',
    unavailable: 'unavailable'
}

export const DESCRIPTION_TYPE = {
    offer: 'offer',
    answer: 'answer'
}
