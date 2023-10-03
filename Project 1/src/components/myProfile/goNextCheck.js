
export const checkStatus = ([user, activeStep]) => {
    
    if(user.status == "graduate"){
        if(activeStep === 1) {
            if (user?.img) {
                return true;
            } else return false;
        }
    
        if(activeStep === 2){
            if(
                user?.name &&
                user?.gender &&
                user?.collegeName &&
                user?.branchName &&
                user?.yearOfGraduation &&
                user?.JEERank
            ){
                return true;
            } else return false;
        }
    
        if(activeStep === 3){
            if(
                user?.skills && user?.skills.length > 0
            ){
                return true;
            } else return false;
        }
    
        if(activeStep === 4){
            if(
                user?.education && user?.education.length > 0
            ){
                return true;
            } else return false;
        }
    
        if(activeStep === 5){
            if(
                user?.job && user?.job.length > 0
            ){
                return true;
            } else return false;
        }
    
        if(activeStep === 6){
            if(
                user?.project && user?.project.length > 0
            ){
                return true;
            } else return false;
        }
    
        if(activeStep === 7){
            if(
                user?.certificate && user?.certificate.length > 0
            ){
                return true;
            } else return false;
        }
    
        if(activeStep === 8){
            if(
                user?.personalInterest && user?.personalInterest.length > 0
            ){
                return true;
            } else return false;
        }
    } else {
        if(activeStep === 1){
            if(user?.subscribedInInternship || user?.subscribedInGalkLab){
                return true;
            }else return false;
        }
    
        if(activeStep === 2) {
            if (user?.img) {
                return true;
            } else return false;
        }
    
        if(activeStep === 3){
            if(
                user?.name &&
                user?.gender &&
                user?.collegeName &&
                user?.branchName &&
                user?.yearOfAdmission &&
                user?.JEERank
            ){
                return true;
            } else return false;
        }
    
        if(activeStep === 4){
            if(
                user?.skills && user?.skills.length > 0
            ){
                return true;
            } else return false;
        }
    
        if(activeStep === 5){
            if(
                user?.education && user?.education.length > 0
            ){
                return true;
            } else return false;
        }
    
        if(activeStep === 6){
            if(
                user?.project && user?.project.length > 0
            ){
                return true;
            } else return false;
        }
    
        if(activeStep === 7){
            if(
                user?.certificate && user?.certificate.length > 0
            ){
                return true;
            } else return false;
        }
    
        if(activeStep === 8){
            if(
                user?.personalInterest && user?.personalInterest.length > 0
            ){
                return true;
            } else return false;
        }
    
        if(activeStep === 9){
            if(
                user?.video
            ){
                return true;
            } else return false;
        }
    }
};