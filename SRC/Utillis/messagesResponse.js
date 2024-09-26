// @desc    this object for any message response 
// @params  statusCode, objectName
// @return  404 -> {<objectName> if not found with id: <id>}
export const messageResponse = (args) => {
    
    if(!args.statusCode){
        return {};
    }

    let messages = {};
    
    if(args.statusCode === 404){
        if(args.objectName){
            if(args.id){
                messages.notFound = `${args.objectName} not found with id: ${args.id}`;
            }
            else{
                messages.notFound = `${args.objectName} not found`;
            }
        }
    }
    
    // if(args.statusCode === 400){
    //     if(!args.requiredFields){
    //         messages.requiredFieldsNeeded = {
    //             error: "missed some required data",
    //         }
    //     }
    //     else{
    //         let error = "missed some required data";

    //         for (let index = 0; index < args.requiredFields.length; index++) {

    //         }
    //         messages.requiredFieldsNeeded = {
    //         }
    //     }
    // }

    return messages;
}