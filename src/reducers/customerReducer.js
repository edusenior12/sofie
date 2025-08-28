export const initialCustomer = {
    id: null
};


export function customerReducer(customer, action) {
    switch (action.type) {
        case 'selected': {
            return {
                id: action.id
            }
        }        
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}