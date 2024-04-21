import { create } from "zustand";
import { createJSONStorage, persist } from 'zustand/middleware'
export const useFormStore = create(
    persist(
        (set) => ({
            currentPage: 'formContact',
            error: '',
            formContact: {
                name: '',
                lastName: '',
                email: '',
                phone: '',
                state: false
            },
            formDetail: {
                travellers: {

                },
                state: false
            },
            formCheckOut: {
                test: ''
            },
            setError: (error) => set((state) => ({
                ...state,
                error
            })),
            setCurrentPage: (page) => set((state) => {
                if (page === 'formDetail' && state.formContact.state) {
                    return {
                        ...state,
                        currentPage: page,
                    };
                } else if (page === 'formCheckOut' && (state.formDetail.state && state.formContact.state)) {
                    return {
                        ...state,
                        currentPage: page
                    };
                } else if (page === 'formContact') {
                    return {
                        ...state,
                        currentPage: page,
                    };
                } else {
                    return state

                }
            }),
            handleForms: (formName, propertyName, value) => set((state) => {
                const updatedForm = { ...state[formName], [propertyName]: value };
                const allPropertiesFilled = Object.values(updatedForm).every(val => val !== '');
                const updatedState = {
                    ...state,
                    [formName]: {
                        ...updatedForm,
                        state: allPropertiesFilled
                    }
                };
                return updatedState;
            }),
            initformDetail: (data) => {
                const travellers = {};
                Object.keys(data).forEach((key) => {
                    travellers[key] = Array.from({ length: data[key] }).map(() => ({
                        name: '',
                        lastName: ''
                    }));
                });
                set((state) => ({
                    formDetail: {
                        ...state.formDetail,
                        travellers: travellers
                    }
                }));
            },
            handleFormsDetails: (idx, property, value, type) =>
                set((state) => {
                    const travellers = { ...state.formDetail.travellers };
                    let allNotEmpty = true
                    if (Object.keys(travellers).length > 0) {
                        travellers[type][idx][property] = value;
                        for (const group in travellers) {
                            if (travellers.hasOwnProperty(group)) {
                                const people = travellers[group];
                                allNotEmpty = people.every(person =>
                                    person.name !== "" && person.lastName !== ""
                                );
                            }
                            if (!allNotEmpty) {
                                break;
                            }
                        }
                        return {
                            formDetail: {
                                ...state.formDetail,
                                travellers: travellers,
                                state: allNotEmpty
                            }
                        };
                    }
                })
        }),
        {
            name: 'formStorage',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);