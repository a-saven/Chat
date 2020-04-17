export const fillResponseData = (inMessage, patient, refillMedecine) => {
  let message = inMessage.data;

  if(message.includes("medicine_list")) {
    let medicineList = []
    let messageObject = JSON.parse(message);
    const medications =  patient.medications;
    for (let i = 0; i < medications.length; i++) {
      medicineList.push({
        title: medications[i]["name"],
        text: medications[i]["name"] + "-" + medications[i]["dosageInfo"],
      });
    }
    messageObject.responses[0].buttons = medicineList;
    message = JSON.stringify(messageObject);
  }

  if(message.includes("indicator_list")) {
    let indicatorList = []
    let messageObject = JSON.parse(message);
    const goals =  patient.goals;
    for (let i = 0; i < goals.length; i++) {
      indicatorList.push({
        title: goals[i]["indicator"],
        text: goals[i]["indicator"] + "-" + goals[i]["value"],
      });
    }
    messageObject.responses[0].buttons = indicatorList;
    message = JSON.stringify(messageObject);
  }

  if (message.includes("patient_name")) {
    message = message.replace(/patient_name/g, patient.firstName)
  }
  if (message.includes("doctor_name")) {
    message = message.replace(/doctor_name/g, patient.doctor)
  }
  if(message.includes("$indicator_name")) {
    message = message.replace(/\$indicator_name/g, patient.goals[0].indicator.split('.'))
  }
  if(message.includes('medicine_name')) {
    message = message.replace(/medicine_name/g, refillMedecine)
  }

  inMessage.data = message;
  return inMessage;
}