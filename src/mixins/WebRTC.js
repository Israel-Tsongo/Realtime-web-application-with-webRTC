import { log } from "../utils/logging"
import { servers } from '../utils/ICEServers'
import { WS_EVENTS, DESCRIPTION_TYPE } from '../utils/config'

export const videoConfiguration = {
    data() {
        return {
            // Media config
            constraints: {
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: false
                },                
                video: {
                    width: 800,
                    height: 470
                },
            },
            // TURN/STUN ice servers               
            configuration: servers,
            // Offer config
            offerOptions: {
                offerToReceiveAudio: 1,
                offerToReceiveVideo: 1
            },

            // Local video 
            myVideo: undefined,
            localStream: undefined,
            localDisplayStream:undefined,
            username: ""
            
           

        }
    },

    created() {
        this.username = this.$store.state.username
    },
    beforeDestroy() {
        this.localStream.getTracks().forEach(track => track.stop())
    },

    methods: {
        async getUserMedia() {
           
            log(`Requesting ${this.username} video stream`)

            if ("mediaDevices" in navigator) {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia(this.constraints)
                    this.myVideo.srcObject = stream                    
                    this.myVideo.volume = 0
                    this.localStream = stream
                    console.log("this.localStream request media",this.localStream)
                } catch (error) {
                    log(`getUserMedia error: ${error}`)
                }
            }
          
  

        },
        async getUserDisplayMediaStream(shareScreen){
            console.log(" User trigged Screen",this.$store.state.username)

             if(shareScreen){

                try {

                    const stream = await navigator.mediaDevices.getDisplayMedia()            
                    this.localDisplayStream=stream         
                    this.myVideo.srcObject = stream
                    this.myVideo.volume = 0
                   
                  

                } catch (error) {   
                log(`getUserDisplayMedia error: ${error}`)
               }

             }else{

                
                    this.getUserMedia()
                    
                  
               
                 
             }
        },
        getAudioVideo() {
            const video = this.localStream.getVideoTracks()
            const audio = this.localStream.getAudioTracks()

            if (video.length > 0) log(`Using video device: ${video[0].label}`)
            if (audio.length > 0) log(`Using audio device: ${audio[0].label}`)
        },
        async setRemoteDescription(remoteDesc, pc) {
            try {
                log(`${this.username} setRemoteDescription: start`)
                await pc.setRemoteDescription(remoteDesc)
                log(`${this.username} setRemoteDescription: finished`)
            } catch (error) {
                log(`Error setting the RemoteDescription in ${this.username}. Error: ${error}`)
            }
        },
        async createOffer(pc, to, room, conference = false) {
            log(`${this.username} wants to start a call with ${to}`)
            try {
                const offer = await pc.createOffer(this.offerOptions)
                log(`${this.username} setLocalDescription: start`)
                await pc.setLocalDescription(offer)
                log(`${this.username} setLocalDescription: finished`)
                this.sendSignalingMessage(pc.localDescription, true, to, room, conference)
            } catch (error) {
                log(`Error creating the offer from ${this.username}. Error: ${error}`)
            }
        },
        async createAnswer(pc, to, room, conference) {
            log(`${this.username} create an answer: start`)
            try {
                const answer = await pc.createAnswer()
                log(`${this.username} setLocalDescription: start`)
                await pc.setLocalDescription(answer)
                log(`${this.username} setLocalDescription: finished`)
                this.sendSignalingMessage(pc.localDescription, false, to, room, conference)
            } catch (error) {
                log(`Error creating the answer from ${this.username}. Error: ${error}`)
            }
        },
        async handleAnswer(desc, pc, from, room, conference = false) {
            log(`${this.username} gets an offer from ${from}`)
            await this.setRemoteDescription(desc, pc)
            this.createAnswer(pc, from, room, conference)
        },
        sendSignalingMessage(desc, offer, to, room, conference) {
            const isOffer = offer ? DESCRIPTION_TYPE.offer : DESCRIPTION_TYPE.answer
            log(`${this.username} sends the ${isOffer} through the signal channel to ${to} in room ${room}`)

            // send the offer to the other peer
            this.$socket.emit(conference ? WS_EVENTS.PCSignalingConference : WS_EVENTS.privateMessagePCSignaling, {
                desc: desc,
                to: to,
                from: this.username,
                room: room,
            })
        },
        onSendFile(dataChannel){
            //console.log("this is your file",this.file)
            console.log("inside on send file1")
            if (this.file) {
                 this.sendData(dataChannel)
            //     console.log("Started to send File")

            //     //dataChannel.label = this.file.name;
            //     dataChannel.binaryType = 'arraybuffer';
            //     //dataChannel.label="Phone"
          
            //     //dataChannel.onopen = async () => {
            //         const sender= async ()=>{
            //         const arrayBuffer = await this.file.arrayBuffer();
            //         for (let i = 0; i < arrayBuffer.byteLength; i += this.MAXIMUM_MESSAGE_SIZE) {
            //             dataChannel.send(arrayBuffer.slice(i, i + this.MAXIMUM_MESSAGE_SIZE));
            //             console.log("repetition send :",i)
            //         }
            //         dataChannel.send(this.END_OF_FILE_MESSAGE);
            //    // };
            //     }
            //     sender()
            //     console.log("Ended to send File")
          
            //     dataChannel.onclose = () => {
            //         console.log("Data Channel is closed")
            //         console.log("file input =======",document.getElementById('select-file-input'))
            //     document.getElementById('select-file-input').value = '';
            //     };
              }
            
             
            // let channel=dataChannel
            //   console.log("after creating datachanel",dataChannel)
            //   console.log("After on message Data connection on the ready teste is ",dataChannel.readyState)

            //   dataChannel.onopen=function(event){

            //         console.log("channel:::: Bonjour bro")
            //         console.log(" whene open channel is ",dataChannel)
            //         dataChannel.send("Bonjour Bro")                    
            //         console.log("The event in chanel.onopen",event)
            //   }

            //   dataChannel.onmessage=function(event){
            //         console.log("On get message from the callee",event.data)
            //   }

           // },600)

        },

        sendData(sendChannel) {
            let fileReader;
            const file = this.file;
            console.log(`File is ${[file.name, file.size, file.type, file.lastModified].join(' ')}`);
          
            // Handle 0 size files.
            // /statusMessage.textContent = '';
            // downloadAnchor.textContent = '';
            if (file.size === 0) {
             // bitrateDiv.innerHTML = '';
             // statusMessage.textContent = 'File is empty, please select a non-empty file';
              //closeDataChannels();
              return;
            }
            //sendProgress.max = file.size;
            //receiveProgress.max = file.size;
            const chunkSize = 16384;
            fileReader = new FileReader();
            let offset = 0;
            fileReader.addEventListener('error', error => console.error('Error reading file:', error));
            fileReader.addEventListener('abort', event => console.log('File reading aborted:', event));
            fileReader.addEventListener('load', e => {
              console.log('FileRead.onload ', e);
              sendChannel.send(e.target.result);
              offset += e.target.result.byteLength;
             // sendProgress.value = offset;
              if (offset < file.size) {
                readSlice(offset);
              }
            });
            const readSlice = o => {
              console.log('readSlice ', o);
              const slice = file.slice(offset, o + chunkSize);
              fileReader.readAsArrayBuffer(slice);
            };
            readSlice(0);
          },


       addLocalStream(pc) {
           
        if(!this.shareScreen && !this.conference.shareSreenInfo.shareScreen){

            console.log("this.localstream  addlocal stream",this.localStream)
           
            pc.addStream(this.localStream)            

           }else if(this.shareScreen && this.localDisplayStream !== undefined){              
            
            let sender=pc.getSenders().find(function(s){ return s.track.kind=='video'});
            sender.replaceTrack(this.localDisplayStream.getTracks()[0])
            

           
           }
             
        },
        addCandidate(pc, candidate) {
            

            try {
                log(`${this.username} added a candidate`)
                pc.addIceCandidate(candidate)
            } catch (error) {
                log(`Error adding a candidate in ${this.username}. Error: ${error}`)
            }
        },
         onIceCandidates(pc, to, room, conference = false) {
            pc.onicecandidate = ({ candidate }) => {
                if (!candidate) return
               
                    this.$socket.emit(conference ? WS_EVENTS.PCSignalingConference : WS_EVENTS.privateMessagePCSignaling, {
                        candidate,
                        to: to,
                        from: this.username,
                        room: room,
                    })
                
            }
        },
         onAddStream(user, video) {
             

             user.pc.onaddstream = event => {
                user.peerVideo = user.peerVideo || document.getElementById(video)
                console.log("*******user.peerVideo",user.peerVideo)
                console.log("*******document.getElementById(video)",document.getElementById(video))
                console.log("*********(!user.peerVideo.srcObject)",(!user.peerVideo.srcObject))
                console.log("*********(event.stream)",(event.stream))

                if (!user.peerVideo.srcObject && event.stream) {
                    console.log("^^^^^^^^^ Inside add stream")
                    user.peerStream = event.stream
                    user.peerVideo.srcObject = user.peerStream
                }
                console.log("Remote video",event.stream)
            }
        },

       
        onReceveFile(dataChannel){                   
        

            // console.log("Onreceve CALLED BUT externally")
          
                
            //         dataChannel.send("Hi back")
            //                 console.log("Hi back")
                        
            //         dataChannel.onmessage=function(event){

            //                 console.log("oups ",event.data)
            //         }
            //     console.log("after ")
            // console.log("Downloding file and sharefile is",dataChannel)
            
                

                
                    this.onReceveFileCallback(dataChannel)
                
                // const receivedBuffers = [];
                // dataChannel.onmessage = async (event) => {
                //   const { data } = event;
                //   console.log("on message called")
                //   try {
                //     if (data !== this.END_OF_FILE_MESSAGE) {
                //       receivedBuffers.push(data);
                //     } else {
                //         console.log("Downloding file")
                //         const arrayBuffer = receivedBuffers.reduce((acc, arrayBuffer) => {
                //             const tmp = new Uint8Array(acc.byteLength + arrayBuffer.byteLength);
                //             tmp.set(new Uint8Array(acc), 0);
                //             tmp.set(new Uint8Array(arrayBuffer), acc.byteLength);
                //             console.log("Call it")
                //             return tmp;
                //       }, new Uint8Array());
                //       const blob = new Blob([arrayBuffer]);
                //       this.downloadFile(blob, dataChannel.label);
                //       dataChannel.close();
                //     }
                //   } catch (err) {
                //     console.log('File transfer failed');
                //   }
                // };
             
           
        },
        onReceveFileCallback(dataChannel){
                 console.log("===============inside=====================")
            dataChannel.binaryType = 'arraybuffer';
                

                dataChannel.onmessage = (event) => {

                   
                     console.log(`Received Message ${event.data.byteLength}`);
                     this.receiveBuffer.push(event.data);
                     this.receivedSize += event.data.byteLength;
                     //receiveProgress.value = receivedSize;
                   
                     // we are assuming that our signaling protocol told
                     // about the expected file size (and name, hash, etc).
        
                     const file = this.conference.shareFileInfo;
                     console.log(`${this.receivedSize} compare to${file.fileSize}`)
                     if (this.receivedSize === file.fileSize) { 
                       const received = new Blob(this.receiveBuffer);
                       this.receiveBuffer = [];
                       console.log(`in side if condition`)
                      //this.downloadFile(received, file.fileName);
                      console.log("downloadAncor=-==1==",document.getElementById('download'))
                      console.log("downloadAncor=-==2==",this.downloadAnchor)
                       this.downloadAnchor.href = URL.createObjectURL(received);
                       this.downloadAnchor.download = file.fileName;
                       this.downloadAnchor.textContent =
                         `Click to download '${file.fileName}' (${file.fileSize} bytes)`;
                       //downloadAnchor.style.display = 'block';
                   
                     //   const bitrate = Math.round(receivedSize * 8 /
                     //     ((new Date()).getTime() - timestampStart));
                     //   bitrateDiv.innerHTML =
                     //     `<strong>Average Bitrate:</strong> ${bitrate} kbits/sec (max: ${bitrateMax} kbits/sec)`;
                   
                     //   if (statsInterval) {
                     //     clearInterval(statsInterval);
                     //     statsInterval = null;
                        }
                   
                      // closeDataChannels();
                    // }
                  // },

                   
                }

      
     },

        downloadFile(blob, fileName){

            console.log("Start Downloading")
                const a = document.createElement('a');
                const url = window.URL.createObjectURL(blob);
                a.href = url;
                a.download = fileName;
                a.click();
                window.URL.revokeObjectURL(url);
                a.remove()
                console.log("End Downloading ")
        },
       
        pauseVideo() {
            this.localStream.getVideoTracks().forEach(t => (t.enabled = !t.enabled))
        },
        pauseAudio() {
            this.localStream.getAudioTracks().forEach(t => (t.enabled = !t.enabled))
        },
    },
}
