import { assign, createMachine } from "xstate";

const bookingMachine = createMachine({
  id: "buy plane tickets",
  initial: "initial",
  context:{
    passengers: [],
    selectedCountry: '',

  },
  states: {
    initial: {
      on: {
        START: {
          target: "search",
        } 
      },
    },
    search: {
      on: {
        CONTINUE: {
          target:"passengers",
          actions: assign ({
            selectedCountry: (context, event)=> event.selectedCountry 
          })
        },
        CANCEL: {
          target: "initial",
          actions: "cleanContext",
        },
      },
    },
    passengers: {
      on: {
        DONE: "tickets",
        CANCEL: {
          target: "initial",
          actions: "cleanContext",
        },
        ADD : {
          target: 'passengers',
          actions: assign (
            (context, event)=> context.passengers.push (event.newPassenger)
          )
        }
      },
    },
    tickets: {
      on: {
        FINISH: "initial",
      },
    },
  },
},
  {
    actions: {
      cleanContext: assign({
        selectedCountry: "",
        passengers: [],
      }),
    },
  }
);

export default bookingMachine;