<template>

<div id="content">
    <Navbar></Navbar>
    <div class="container-fluid">
        <header class="d-flex justify-content-center align-items-center masthead text-center text-white d-flex" id="headerSection">
            <div class="jumbotron" id="findRoomJumbotron">
                <div class="container d-flex justify-content-center align-items-center" id="infoContainer">
                    <div class="row" id="jumbotronRow">
                        <div class="col-lg-5">
                            <div class="d-flex justify-content-center align-items-center" style="height: 100%;">
                                <div style="width: 100%;height: auto;">
                                    <h4 style="color: rgb(0,0,0);opacity: 0.78;filter: blur(0px) brightness(0%);">Find a room or create your own<br></h4>
                                    <p style="font-size: 14px;color: rgb(0,0,0);opacity: 1;">Please&nbsp;<span style="color: rgb(3,28,247);">register for a group&nbsp;</span>&nbsp;before you can join live video discussion</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-7 d-lg-flex justify-content-lg-center align-items-lg-center">
                            <div class="row no-gutters justify-content-between" style="margin: 0px;width: 100%;">
                                <div class="col-sm-11 col-lg-6" style="padding: 0px;width: 200px;margin-left: 20px;">
                                    <form>
                                        <div class="input-field room-inputs">
                                            <span class="d-flex justify-content-center align-items-center" style="margin-left: 10px;">
                                                <i class="fa fa-search rounded-circle" style="background: #79ace8;box-shadow: 0px 0px 9px 2px;opacity: 0.72;"></i>
                                            </span>
                                            <input class="form-control" type="text" placeholder="Search a room ..." style="padding: 6px 12px;/*padding-bottom: 5px;*/margin: 0px;">
                                        </div>
                                    </form>
                                </div>
                                <div class="col-sm-10 col-lg-5 d-sm-flex justify-content-sm-center" style="padding: 0px;margin-left: 0px;">
                                    <form style="width: 190px;">
                                        <div class="input-field room-inputs" style="width: 218px;display: flex;"><span class="d-flex justify-content-center align-items-center" style="margin-left: 10px;"><i class="fa fa-video-camera rounded-circle" style="background: #79ace8;box-shadow: 0px 0px 9px 2px;opacity: 0.72;"></i></span><select class="form-control selectInFindRoom" style="width: 162px;margin-left: 10px;margin-top: 0px;">
                                                <optgroup label="This is a group">
                                                    <option value="12" selected="">This is item 1</option>
                                                    <option value="13">This is item 2</option>
                                                    <option value="14">This is item 3</option>
                                                </optgroup>
                                            </select></div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <section id="mainSection">
            <div id="joinTitle">
                <h3 class="text-center">Join one of the following Room</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut voluptatum eius re laudantium consectetur!<br></p>
            </div>
            <div class="container" style="width: 100%;">
                <div class="row">
                    <div class="col-auto col-sm-12 col-md-6 col-lg-4 col-xl-4 d-sm-flex justify-content-sm-center card-cls">
                        <div class="team-member joinCard">
                            <div class="d-flex justify-content-center align-items-center all-avatars" style="height: 35px;margin-bottom: 20px;">
                                <div class="d-inline-flex justify-content-center" id="avatars" style="width: 175px;margin-top: -15px;height: 48px;margin-left: 9px;"><span class="avatar"><img class="img-fluid rounded-circle mx-auto" src="assets/img/114%20.jpg" style="width: 40px;height: 40px;"></span><span class="avatar"><img class="img-fluid rounded-circle mx-auto" src="assets/img/114%20.jpg" style="width: 40px;height: 40px;"></span><span class="avatar"><img class="img-fluid rounded-circle mx-auto" src="assets/img/114%20.jpg" style="width: 40px;height: 40px;"></span><span class="avatar"><img class="img-fluid rounded-circle mx-auto" src="assets/img/114%20.jpg" style="width: 40px;height: 40px;"></span><span class="avatar"><img class="img-fluid rounded-circle mx-auto" src="assets/img/114%20.jpg" style="width: 40px;height: 40px;"></span><span class="d-md-flex justify-content-center align-items-md-center avatar rounded-circle" style="background: #3f45cd;font-size: 14px;color: rgb(255,255,255);width: 40px;height: 40px;">+8</span></div>
                            </div>
                            <p class="joinCard-para"><strong>How is the best great Designer</strong><br></p>
                            <div class="d-flex justify-content-center">
                                <div class="d-flex justify-content-center" style="width: 100%;">
                                    <div class="joinCardService" style="height: 37px;">
                                        <p class="d-inline-flex joinCardServicePara1">Blockchain</p>
                                        <p class="d-inline-flex joinCardServicePara2">Design</p>
                                        <p class="d-inline-flex joinCardServicePara3">Trading&nbsp;&nbsp;<span class="joinCardCount">+3&nbsp;</span></p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="d-flex d-lg-flex justify-content-center align-content-center justify-content-lg-center align-items-lg-center" style="border-color: rgba(33,37,41,0.45);width: 100%;">
                                    <p class="d-inline-flex" style="border-bottom: 1px solid rgba(11,11,11,0.55);color: rgba(58,39,39,0.51);"><i class="fa fa-clock-o d-md-flex d-lg-flex align-items-md-center align-items-lg-center"></i>&nbsp;<span>10:00</span><span>-</span><span>11:30</span></p>
                                </div>
                            </div>
                            <div class="d-flex justify-content-center" style="width: 100%;">
                                <div class="divPeopleInside">
                                    <p><span style="font-weight: 400;">4 people inside&nbsp;</span><span style="font-weight: 900;">-</span>&nbsp;<span class="freeSlotSpan">6 free slots</span>&nbsp;</p>
                                </div>
                            </div>
                            <div class="parentDivButtonJoin">
                                <div class="d-flex justify-content-center divButtonJoin"><button class="btn btn-success btn-block buttonJoin" type="button"><span class="rounded-circle buttonJoinSpan"><i class="fa fa-plus buttonJoinIcon"></i></span>&nbsp; &nbsp;Join the Room</button></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-auto col-sm-12 col-md-6 col-lg-4 col-xl-4 d-sm-flex justify-content-sm-center card-cls">
                        <div class="team-member joinCard" style="width: 285px;background: #ffffff;border-radius: 20px;height: 300px;margin-right: 9px;">
                            <div class="d-flex justify-content-center align-items-center all-avatars" style="height: 35px;margin-bottom: 20px;">
                                <div class="d-inline-flex justify-content-center" id="avatars-1" style="width: 175px;margin-top: -15px;height: 48px;margin-left: 9px;"><span class="avatar"><img class="img-fluid rounded-circle mx-auto" src="assets/img/114%20.jpg" style="width: 40px;height: 40px;"></span><span class="avatar"><img class="img-fluid rounded-circle mx-auto" src="assets/img/114%20.jpg" style="width: 40px;height: 40px;"></span><span class="avatar"><img class="img-fluid rounded-circle mx-auto" src="assets/img/114%20.jpg" style="width: 40px;height: 40px;"></span><span class="avatar"><img class="img-fluid rounded-circle mx-auto" src="assets/img/114%20.jpg" style="width: 40px;height: 40px;"></span><span class="avatar"><img class="img-fluid rounded-circle mx-auto" src="assets/img/114%20.jpg" style="width: 40px;height: 40px;"></span><span class="d-md-flex justify-content-center align-items-md-center avatar rounded-circle" style="background: #3f45cd;font-size: 14px;color: rgb(255,255,255);width: 40px;height: 40px;">+8</span></div>
                            </div>
                            <p style="text-align: center;margin-top: 10px;width: 100%;opacity: 0.70;font-weight: 800;"><strong>How is the best great Designer</strong><br></p>
                            <div class="d-flex justify-content-center">
                                <div class="d-flex justify-content-center" style="width: 100%;">
                                    <div style="height: 37px;">
                                        <p class="d-inline-flex" style="color: rgb(251,127,37);/*background: rgba(203,124,32,0.41);*/border-radius: 10px;padding: 0px;font-weight: 400;padding-right: 6px;padding-left: 6px;text-shadow: 1px 1px 3px;opacity: 0.84;">Blockchain</p>
                                        <p class="d-inline-flex" style="margin-right: 2px;margin-left: 2px;padding: 0px;color: rgb(12,21,30);/*background: #9ca3dc;*/border-radius: 9px;padding-right: 6px;padding-left: 6px;text-shadow: 1px 1px 3px;opacity: 0.88;">Design</p>
                                        <p class="d-inline-flex" style="padding: 0px;color: rgb(26,133,241);border-radius: 8px;/*background: #748de3;*/padding-right: 6px;padding-left: 6px;text-shadow: 1px 1px 3px;">Trading&nbsp;&nbsp;<span style="color: rgb(244,21,21);background: #bae9b9;border-radius: 15px;">+3&nbsp;</span></p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="d-flex d-lg-flex justify-content-center align-content-center justify-content-lg-center align-items-lg-center" style="border-color: rgba(33,37,41,0.45);width: 100%;">
                                    <p class="d-inline-flex" style="border-bottom: 1px solid rgba(11,11,11,0.55);color: rgba(58,39,39,0.51);"><i class="fa fa-clock-o d-md-flex d-lg-flex align-items-md-center align-items-lg-center"></i>&nbsp;<span>10:00</span><span>-</span><span>11:30</span></p>
                                </div>
                            </div>
                            <div class="d-flex justify-content-center" style="width: 100%;">
                                <div style="width: 100%;text-align: center;">
                                    <p><span style="font-weight: 400;">4 people inside&nbsp;</span><span style="font-weight: 900;">-</span>&nbsp;<span style="font-weight: 700;color: rgb(138,216,138);text-shadow: 2px 1px 4px rgb(208,230,208);">6 free slots</span>&nbsp;</p>
                                </div>
                            </div>
                            <div style="height: 45px;margin-top: 8px;">
                                <div class="d-flex justify-content-center" style="width: 100%;height: 45px;"><button class="btn btn-success btn-block" type="button" style="border-radius: 40px;margin-bottom: 0px;width: 220px;padding: 0px;padding-left: 10px;padding-right: 45px;font-weight: 500;padding-top: 0px;height: 50px;padding-bottom: 0px;"><span class="rounded-circle" style="width: auto;border-radius: 23px;height: auto;background: rgba(255,255,255,0.35);font-size: 19px;"><i class="fa fa-plus" style="width: 34px;font-size: 19px;height: 19px;"></i></span>&nbsp; &nbsp;Join the Room</button></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-auto col-sm-12 col-md-6 col-lg-4 col-xl-4 d-sm-flex justify-content-sm-center card-cls">
                        <div class="team-member joinCard">
                            <div class="d-flex justify-content-center align-items-center all-avatars" style="height: 35px;margin-bottom: 20px;">
                                <div class="d-inline-flex justify-content-center" id="avatars-2" style="width: 175px;margin-top: -15px;height: 48px;margin-left: 9px;"><span class="avatar"><img class="img-fluid rounded-circle mx-auto" src="assets/img/114%20.jpg" style="width: 40px;height: 40px;"></span><span class="avatar"><img class="img-fluid rounded-circle mx-auto" src="assets/img/114%20.jpg" style="width: 40px;height: 40px;"></span><span class="avatar"><img class="img-fluid rounded-circle mx-auto" src="assets/img/114%20.jpg" style="width: 40px;height: 40px;"></span><span class="avatar"><img class="img-fluid rounded-circle mx-auto" src="assets/img/114%20.jpg" style="width: 40px;height: 40px;"></span><span class="avatar"><img class="img-fluid rounded-circle mx-auto" src="assets/img/114%20.jpg" style="width: 40px;height: 40px;"></span><span class="d-md-flex justify-content-center align-items-md-center avatar rounded-circle" style="background: #3f45cd;font-size: 14px;color: rgb(255,255,255);width: 40px;height: 40px;">+8</span></div>
                            </div>
                            <p style="text-align: center;margin-top: 10px;width: 100%;opacity: 0.70;font-weight: 800;"><strong>How is the best great Designer</strong><br></p>
                            <div class="d-flex justify-content-center">
                                <div class="d-flex justify-content-center" style="width: 100%;">
                                    <div style="height: 37px;">
                                        <p class="d-inline-flex" style="color: rgb(251,127,37);/*background: rgba(203,124,32,0.41);*/border-radius: 10px;padding: 0px;font-weight: 400;padding-right: 6px;padding-left: 6px;text-shadow: 1px 1px 3px;opacity: 0.84;">Blockchain</p>
                                        <p class="d-inline-flex" style="margin-right: 2px;margin-left: 2px;padding: 0px;color: rgb(12,21,30);/*background: #9ca3dc;*/border-radius: 9px;padding-right: 6px;padding-left: 6px;text-shadow: 1px 1px 3px;opacity: 0.88;">Design</p>
                                        <p class="d-inline-flex" style="padding: 0px;color: rgb(26,133,241);border-radius: 8px;/*background: #748de3;*/padding-right: 6px;padding-left: 6px;text-shadow: 1px 1px 3px;">Trading&nbsp;&nbsp;<span style="color: rgb(244,21,21);background: #bae9b9;border-radius: 15px;">+3&nbsp;</span></p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="d-flex d-lg-flex justify-content-center align-content-center justify-content-lg-center align-items-lg-center" style="border-color: rgba(33,37,41,0.45);width: 100%;">
                                    <p class="d-inline-flex" style="border-bottom: 1px solid rgba(11,11,11,0.55);color: rgba(58,39,39,0.51);"><i class="fa fa-clock-o d-md-flex d-lg-flex align-items-md-center align-items-lg-center"></i>&nbsp;<span>10:00</span><span>-</span><span>11:30</span></p>
                                </div>
                            </div>
                            <div class="d-flex justify-content-center" style="width: 100%;">
                                <div style="width: 100%;text-align: center;">
                                    <p><span style="font-weight: 400;">4 people inside&nbsp;</span><span style="font-weight: 900;">-</span>&nbsp;<span style="font-weight: 700;color: rgb(138,216,138);text-shadow: 2px 1px 4px rgb(208,230,208);">6 free slots</span>&nbsp;</p>
                                </div>
                            </div>
                            <div style="height: 45px;margin-top: 8px;">
                                <div class="d-flex justify-content-center" style="width: 100%;height: 45px;"><button class="btn btn-success btn-block" type="button" style="border-radius: 40px;margin-bottom: 0px;width: 220px;padding: 0px;padding-left: 10px;padding-right: 45px;font-weight: 500;padding-top: 0px;height: 50px;padding-bottom: 0px;"><span class="rounded-circle" style="width: auto;border-radius: 23px;height: auto;background: rgba(255,255,255,0.35);font-size: 19px;"><i class="fa fa-plus" style="width: 34px;font-size: 19px;height: 19px;"></i></span>&nbsp; &nbsp;Join the Room</button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div class="footer-clean">
            <div style="text-align: center;margin-top: 19px;font-style: italic;font-size: 11px;">
                <span>Israel tsongo @ the new Designer</span>
            </div>
        </div>
    </div>
</div>
    
</template>
<script>
import Navbar from "./../components/chatMessages/OtherComponents/Navbar.vue"

export default {
    name:"MeetingList",
    components:{

        Navbar
    }
    
}
</script>
<style>

</style>