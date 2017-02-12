export let config = { 
    debugMode:true,
    notLoginedAction: () => { },
    loading: (show: boolean) => { },
    error: (message: string, timeout: number = 1000) => { }
};