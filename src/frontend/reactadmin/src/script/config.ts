export let config = { 
    debugMode:false,
    notLoginedAction: () => { },
    loading: (show: boolean) => { },
    error: (message: string, timeout: number = 1000) => { }
};