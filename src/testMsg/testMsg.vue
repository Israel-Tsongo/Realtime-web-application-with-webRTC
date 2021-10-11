<template>
    <div id="wrapper" style="/*justify-content: center;*/">
        <div class="d-flex flex-column" id="content-wrapper">
            <div id="content">
                <div class="container-fluid">
                    <section id="main-section">
                        <nav class="navbar navbar-light navbar-expand-lg bg-primary fixed-top" id="mainNav">
                            <div class="container-fluid"><a class="navbar-brand js-scroll-trigger" id="brand-title" href="#"><span><i class="fa fa-video-camera"></i>&nbsp;</span>MakeACall</a><button data-toggle="collapse" class="navbar-toggler navbar-toggler-right" data-target="#navbarResponsive"><span class="sr-only">Toggle navigation</span><span class="navbar-toggler-icon"></span></button>
                                <div class="collapse navbar-collapse" id="navbarResponsive" style="width: 891.6px;">
                                    <ul class="navbar-nav mx-auto navClass">
                                        <li class="nav-item"><a class="nav-link active js-scroll-trigger navColor" href="index.html">Home</a></li>
                                        <li class="nav-item"><a class="nav-link js-scroll-trigger navColor" href="message.html">Messages</a></li>
                                        <li class="nav-item"><a class="nav-link js-scroll-trigger navColor" href="videoConference.html" style="color: rgba(15,10,10,0.9);">Video conference</a></li>
                                        <li class="nav-item"><a class="nav-link js-scroll-trigger navColor" href="#">A propos</a></li>
                                        <li class="nav-item d-lg-flex justify-content-lg-center align-items-lg-center" id="profileDropdown">
                                            <div class="nav-item dropdown"><a aria-expanded="false" data-toggle="dropdown"><span class="text-monospace text-capitalize" style="height: 2rem;display: inline-block;width: auto;font-size: 19px;color: white;">Israel Tsongo&nbsp;<img class="img-fluid rounded-circle imgProfile" src="assets/img/114%20.jpg"></span></a>
                                                <div class="dropdown-menu"><a class="dropdown-item text-monospace text-capitalize" href="#">Profile</a><a class="dropdown-item text-monospace text-capitalize" href="#">Parametre</a><a class="dropdown-item text-monospace text-capitalize" href="#">Logout</a></div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                        <div class="row d-xl-flex" id="main-row">
                            <div class="col-lg-8 col-xl-12 d-xl-flex justify-content-xl-center align-items-xl-center">
                                <div class="card" id="main-card">
                                    <div class="card-body" id="mainCardBody">
                                        <div id="mainDivMsg">
                                            <div class="row" id="rowMsg">
                                                <div class="col-sm-5 col-md-4 col-lg-4 col-xl-4 d-xl-flex align-items-xl-center" id="col-rowMsg">
                                                    <div id="mainDiv-listContact">
                                                        <div id="listContact-info">
                                                            <div class="row" id="contact-info-row">
                                                                <div class="col-sm-5 col-lg-5 col-xl-4"><span id="contact-info-name">Israel</span></div>
                                                                <div class="col-sm-4 col-lg-4 col-xl-4 offset-sm-1 offset-lg-2 offset-xl-2 d-sm-flex align-items-sm-center"><span class="contact-info-spanIcons"><i class="fas fa-search contact-info-icons" style="font-size: 20px;"></i></span><span class="contact-info-spanIcons"><i class="material-icons contact-info-icons">airplanemode_inactive</i></span><span class="contact-info-spanIcons"><i class="fa fa-ellipsis-v contact-info-icons"></i></span></div>
                                                            </div>
                                                            <form id="contact-info-form">
                                                                <div id="contactList-div-search">
                                                                    <div id="inside-div-search-in-listContacts" class="input-field"><span class="d-flex justify-content-center align-items-center" id="contactInfo-search-span-icon"><i class="fa fa-search rounded-circle"></i></span><input class="form-control" type="text" id="contact-info-searchInput" placeholder="Recherche"></div>
                                                                </div>
                                                            </form><span id="list-contact-img-span"><img class="img-fluid rounded-circle" id="listContactInfo-profile-img" src="assets/img/114%20.jpg"><span id="localOnlineStatus" class="rounded-circle"><span class="rounded-circle"></span></span></span>
                                                        </div>
                                                        <div id="listcontact-div">
                                                            <div id="inside-listContact-div">
                                                                <div class="row contact-row">
                                                                    <div class="col-sm-2 col-md-2 col-lg-2 col-xl-3 d-xl-flex justify-content-xl-center align-items-xl-center contact-col-image"><span class="contact-span-image"><img class="img-fluid contact-img" src="assets/img/114%20.jpg"><span class="remoteOnlineStatus rounded-circle"><span class="rounded-circle"></span></span></span></div>
                                                                    <div class="col-sm-10 col-md-10 col-lg-10 col-xl-9 offset-sm-0 contact-col-content">
                                                                        <div class="row">
                                                                            <div class="col-sm-8 col-md-8 col-lg-8 col-xl-8 align-self-sm-center">
                                                                                <h6 class="contact-head-title">L4 Science compliquee</h6>
                                                                            </div>
                                                                            <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3 div-timeSpan"><span class="time-span">12:29</span></div>
                                                                        </div>
                                                                        <p class="contact-text-para"><span class="contact-last-name">Celestin :&nbsp;</span>&nbsp;Halla Madrida</p>
                                                                        <hr class="contact-horizontal-line">
                                                                    </div>
                                                                </div>
                                                                <div class="row contact-row">
                                                                    <div class="col-sm-2 col-md-2 col-lg-2 col-xl-3 d-xl-flex justify-content-xl-center align-items-xl-center contact-col-image" style="padding-right: 0px;padding-left: 30px;padding-bottom: 11px;"><span class="contact-span-image"><img class="img-fluid contact-img" src="assets/img/114%20.jpg"></span></div>
                                                                    <div class="col-sm-10 col-md-10 col-lg-10 col-xl-9 contact-col-content" style="text-align: left;">
                                                                        <div class="row">
                                                                            <div class="col-sm-8 col-md-8 col-lg-8 col-xl-8 align-self-sm-center">
                                                                                <h6 class="contact-head-title">L4 Science compliquee</h6>
                                                                            </div>
                                                                            <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3 div-timeSpan"><span class="time-span">12:29</span></div>
                                                                        </div>
                                                                        <p class="contact-text-para"><span class="contact-last-name">Celestin :&nbsp;</span>&nbsp;Halla Madrida</p>
                                                                        <hr class="contact-horizontal-line">
                                                                    </div>
                                                                </div>
                                                                <div class="row contact-row">
                                                                    <div class="col-sm-2 col-md-2 col-lg-2 col-xl-3 d-xl-flex justify-content-xl-center align-items-xl-center contact-col-image" style="padding-right: 0px;padding-left: 30px;padding-bottom: 11px;"><span class="contact-span-image"><img class="img-fluid contact-img" src="assets/img/114%20.jpg"></span></div>
                                                                    <div class="col-sm-10 col-md-10 col-lg-10 col-xl-9 contact-col-content" style="text-align: left;">
                                                                        <div class="row">
                                                                            <div class="col-sm-8 col-md-8 col-lg-8 col-xl-8 align-self-sm-center">
                                                                                <h6 class="contact-head-title">L4 Science compliquee</h6>
                                                                            </div>
                                                                            <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3 div-timeSpan"><span class="time-span">12:29</span></div>
                                                                        </div>
                                                                        <p class="contact-text-para"><span class="contact-last-name">Celestin :&nbsp;</span>&nbsp;Halla Madrida</p>
                                                                        <hr class="contact-horizontal-line">
                                                                    </div>
                                                                </div>
                                                                <div class="row contact-row">
                                                                    <div class="col-sm-2 col-md-2 col-lg-2 col-xl-3 d-xl-flex justify-content-xl-center align-items-xl-center contact-col-image" style="padding-right: 0px;padding-left: 30px;padding-bottom: 11px;"><span class="contact-span-image"><img class="img-fluid contact-img" src="assets/img/114%20.jpg"></span></div>
                                                                    <div class="col-sm-10 col-md-10 col-lg-10 col-xl-9 contact-col-content" style="text-align: left;">
                                                                        <div class="row">
                                                                            <div class="col-sm-8 col-md-8 col-lg-8 col-xl-8 align-self-sm-center">
                                                                                <h6 class="contact-head-title">L4 Science compliquee</h6>
                                                                            </div>
                                                                            <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3 div-timeSpan"><span class="time-span">12:29</span></div>
                                                                        </div>
                                                                        <p class="contact-text-para"><span class="contact-last-name">Celestin :&nbsp;</span>&nbsp;Halla Madrida</p>
                                                                        <hr class="contact-horizontal-line">
                                                                    </div>
                                                                </div>
                                                                <div class="row contact-row">
                                                                    <div class="col-sm-2 col-md-2 col-lg-2 col-xl-3 d-xl-flex justify-content-xl-center align-items-xl-center contact-col-image" style="padding-right: 0px;padding-left: 30px;padding-bottom: 11px;"><span class="contact-span-image"><img class="img-fluid contact-img" src="assets/img/114%20.jpg"></span></div>
                                                                    <div class="col-sm-10 col-md-10 col-lg-10 col-xl-9 contact-col-content" style="text-align: left;">
                                                                        <div class="row">
                                                                            <div class="col-sm-8 col-md-8 col-lg-8 col-xl-8 align-self-sm-center">
                                                                                <h6 class="contact-head-title">L4 Science compliquee</h6>
                                                                            </div>
                                                                            <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3 div-timeSpan"><span class="time-span">12:29</span></div>
                                                                        </div>
                                                                        <p class="contact-text-para"><span class="contact-last-name">Celestin :&nbsp;</span>&nbsp;Halla Madrida</p>
                                                                        <hr class="contact-horizontal-line">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-8 col-lg-8 col-xl-7 col-allMessages">
                                                    <div id="mainDiv-allMessages">
                                                        <div id="messages-info-div">
                                                            <div class="row rowInfo">
                                                                <div class="col-md-3 col-xl-4 d-xl-flex justify-content-xl-center align-items-xl-center colsMessages">
                                                                    <div id="messages-user-nfo">
                                                                        <div id="messages-info-img"><span id="messages-info-spanImg"><img class="img-fluid rounded-circle" id="messages-info-imgProfile" src="assets/img/114%20.jpg"><span class="remoteOnlineStatusInfo rounded-circle"><span class="rounded-circle"></span></span></span></div>
                                                                        <div id="messages-info-personnal">
                                                                            <h4 id="remoteName">Israel Tsongo</h4><span id="remoteStateConnection">Aujourdhui a 10 h 30</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-3 col-xl-4 d-xl-flex justify-content-xl-center colsMessages">
                                                                    <div class="d-xl-flex justify-content-xl-center align-items-xl-center" id="messages-info-search-div">
                                                                        <div id="messages-info-search-inside-div">
                                                                            <form class="d-none d-sm-inline-block mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search" id="messages-form">
                                                                                <div class="input-group"><input class="bg-light form-control border-0 small" type="text" placeholder="Search for ...">
                                                                                    <div class="input-group-append"><button class="btn btn-primary py-0" type="button"><i class="fas fa-search"></i></button></div>
                                                                                </div>
                                                                            </form>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-5 col-xl-4 d-xl-flex justify-content-xl-center align-items-xl-center colsMessages">
                                                                    <div class="d-xl-flex justify-content-xl-center align-items-xl-center" id="messages-info-divIcons">
                                                                        <div id="messages-info-inside-divIcons"><span class="messages-info-spanIcons" data-toggle="modal" data-target="#audioAppelModal"><i class="icon ion-android-call messages-info-icons"></i></span><span class="messages-info-spanIcons" data-toggle="modal" data-target="#videoAppelModal"><i class="icon ion-ios-videocam messages-info-icons"></i></span><span class="d-xl-flex align-items-xl-center messages-info-spanIcons"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20" fill="none" class="messages-info-icons">

                                                                                    <path d="M10 6C8.89543 6 8 5.10457 8 4C8 2.89543 8.89543 2 10 2C11.1046 2 12 2.89543 12 4C12 5.10457 11.1046 6 10 6Z" fill="currentColor"></path>
                                                                                    <path d="M10 12C8.89543 12 8 11.1046 8 10C8 8.89543 8.89543 8 10 8C11.1046 8 12 8.89543 12 10C12 11.1046 11.1046 12 10 12Z" fill="currentColor"></path>
                                                                                    <path d="M10 18C8.89543 18 8 17.1046 8 16C8 14.8954 8.89543 14 10 14C11.1046 14 12 14.8954 12 16C12 17.1046 11.1046 18 10 18Z" fill="currentColor"></path>
                                                                                </svg></span></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div id="messages-content-mainDivWithContact" class="messages-content-mainDiv">
                                                            <div id="chat-panel"><a class="border rounded d-inline scroll-to-top" id="page-bottom" href="#inputAndSend-div"><i class="fas fa-angle-down"></i></a>
                                                                <div class="row no-gutters">
                                                                    <div class="col-md-3 col-lg-6 col-xl-7">
                                                                        <div class="chat-bubble chat-bubble--left message-incoming-msg-div">
                                                                            <p class="#messages-incoming-textPara">Hello bro&nbsp;&nbsp;</p><span class="text-right messages-incoming-timeSpan"><span class="messages-incoming-time">12:56</span></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col d-xl-flex justify-content-xl-center align-items-xl-center">
                                                                        <div id="messageInfo">
                                                                            <p id="messageInfo-para">You joined</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="row no-gutters">
                                                                    <div class="col-md-3 col-xl-8 offset-xl-4 offset-md-9">
                                                                        <div class="chat-bubble chat-bubble--right message-outcoming-msg-div">
                                                                            <p class="messages-outcoming-textPara">Est une technologie révolutionnaire qui ne mérite pas d'être néglige du fait de la gratuite de l'enseignement sans oublier la coiffure anatomique qui pourrai nous contraire du faite des calcul super méta fiasque du second siècle alla ronde du ménage a trois</p><span class="text-right messages-outcoming-timeSpan"><span class="messages-outcoming-time">12:56</span><span><i class="fas fa-check" style="font-size: 12px;"></i></span></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div id="inputAndSend-div">
                                                                <div class="row row-input">
                                                                    <div class="col-xl-12" id="colRowInput">
                                                                        <div id="div-Inside-inputAndSend">
                                                                            <div id="div-under-divInside-inputAndSend">
                                                                                <form id="messages-input-form">
                                                                                    <div id="messages-input-div" class="input-field"><span class="d-flex justify-content-center align-items-center" id="messages-input-emojiSpan"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" id="messages-input-emojIcon">
                                                                                                <path d="M14.8284 14.8284C13.2663 16.3905 10.7337 16.3905 9.17157 14.8284M9 10H9.01M15 10H15.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                                                            </svg></span><input class="form-control" type="text" id="messages-inputField" placeholder="Typer un message"><span class="d-xl-flex align-items-xl-center" id="messages-input-fileSpan"><i class="material-icons" id="messages-input-fileIcon">attach_file</i></span></div>
                                                                                </form>
                                                                                <div class="d-xl-flex justify-content-xl-center align-items-xl-center" id="messages-sendDiv"><button class="btn btn-primary rounded-circle" id="messages-send-Button" type="button"><i class="fa fa-send-o"></i></button></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div><a class="border rounded d-inline scroll-to-top" id="top-btn" href="#page-top"><i class="fas fa-angle-up"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal fade" role="dialog" tabindex="-1" id="videoAppelModal">
                            <div class="modal-dialog" role="document" style="max-width: 40rem;">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h4 class="modal-title">Appel video&nbsp;</h4><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                                    </div>
                                    <div class="modal-body" id="video-modal-body">
                                        <div id="content-div">
                                            <div id="main-div"><span id="videoSpan"><img class="img-fluid" id="Remote-video" src="assets/img/young-college-students.jpg"></span>
                                                <div id="local-video-div">
                                                    <div id="localVideo-mainDiv"><span id="localVideoSpan"><img class="img-fluid" id="Local-video" src="assets/img/114%20.jpg"></span><span class="text-center" id="localVideo-muteSpan"><i class="material-icons" id="localVideoMuted-Icon">mic_off</i></span></div>
                                                </div>
                                                <div id="localVideo-VolumeDiv"><input type="range" id="localVideo-volumeRange">
                                                    <div id="localVideo-volumeIconDiv" class="input-field"><span class="d-flex justify-content-center align-items-center"><i class="fa fa-volume-up rounded-circle" id="localVolumeIcon"></i></span></div>
                                                </div>
                                                <div id="localvideoControl-div" style="position: absolute;height: 5rem;display: flex;justify-content: center;bottom: 2%;left: 21%;">
                                                    <div class="d-lg-flex align-items-lg-center" id="localvideoControl-main"><button class="btn btn-light btn-control rounded-circle control-btn" type="button"><span id="camera-span"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-camera-video-fill" id="cameraIcon">
                                                                    <path fill-rule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5z"></path>
                                                                </svg></span></button><button class="btn btn-light control-btn btn-control rounded-circle" id="share-btn" type="button"><span id="share-span"><i class="material-icons" style="font-size: 21px;">screen_share</i></span></button><button class="btn btn-danger control-btn btn-control" id="endCall-btn" type="button"><span><i class="material-icons" id="end-call-icon">call_end</i></span></button><button class="btn btn-light btn-control rounded-circle" id="mic-btn" type="button"><span id="mic-span"><i class="fa fa-microphone" id="mic-icon"></i></span></button><button class="btn btn-light btn-control rounded-circle" id="fullScreen-btn" type="button"><span id="fullscreen-span"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-arrows-fullscreen" id="fullscreen-icon" style="font-size: 15px;">
                                                                    <path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z"></path>
                                                                </svg></span></button></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer" id="video-modal-footer"><button class="btn btn-primary" id="video-modal-btn-fermer" type="button" data-dismiss="modal">Fermer</button></div>
                                </div>
                            </div>
                        </div>
                        <div class="modal fade" role="dialog" tabindex="-1" id="audioAppelModal">
                            <div class="modal-dialog" role="document" id="sizesAudioModal">
                                <div class="modal-content">
                                    <div class="modal-header" style="height: 55px;">
                                        <h4 class="modal-title">Appel Audio</h4><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                                    </div>
                                    <div class="modal-body" id="modal-audio">
                                        <div id="audio-modal-main">
                                            <div id="audio-model-title"><span id="audio-modal-span"><i class="icon ion-android-call" id="audio-modal-icon-call"></i>&nbsp; Appel Audio</span></div>
                                            <div id="audio-main-Icon"><span class="d-xl-flex justify-content-xl-center align-items-xl-center rounded-circle" id="audio-main-iconSpan"><span class="d-lg-flex d-xl-flex justify-content-lg-center align-items-lg-center justify-content-xl-center align-items-xl-center rounded-circle" id="audio-main-second-iconSpan"><i class="fa fa-user" id="audio-main-icon"></i></span></span></div>
                                            <div style="height: 3rem;display: flex;justify-content: center;margin-top: 3px;">
                                                <div style="width: 6rem;height: inherit;color: white;"><span class="text-center" style="display: block;font-weight: 502;">Appel audio&nbsp;</span><span class="d-xl-flex justify-content-xl-center">Avec</span><span class="text-center d-xl-flex justify-content-xl-center" style="display: block;font-size: 25px;font-weight: 700;">Gerkis</span></div>
                                            </div>
                                            <div id="audio-modal-spaceDiv"></div>
                                            <div id="audio-control-dv">
                                                <div class="d-xl-flex justify-content-xl-center" id="audio-control-div-icon"><button class="btn btn-primary rounded-circle" id="audio-control-mic-btn" type="button" style="height: 3rem;width: 3rem;"><i class="fas fa-microphone-alt-slash"></i></button><button class="btn btn-danger rounded-circle" id="audio-control-endCall-btn" type="button"><i class="material-icons">call_end</i></button><button class="btn btn-primary rounded-circle" id="audio-control-volume-btn" type="button"><i class="fa fa-volume-up"></i></button></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer" id="audio-modal-footer" style="height: 64px;align-items: center;"><button class="btn btn-primary" id="audio-modal-footer-fermer" type="button" data-dismiss="modal">Fermer</button></div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
   


</template>

<script>


</script>

<style>

</style>
