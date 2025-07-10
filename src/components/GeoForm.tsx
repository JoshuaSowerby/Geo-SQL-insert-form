//https://www.youtube.com/playlist?list=PLC3y8-rFHvwjmgBr1327BA5bVXoQH-w5s
import { getValue } from "@testing-library/user-event/dist/utils";
import { useForm } from "react-hook-form";

type FormValues = {
    from: string,
    to: string,
    email: string,
    timestamp: Date
};

export const GeoForm = () => {
    const form = useForm<FormValues>();
    const {register, handleSubmit, formState, getValues}=form;
    const {errors} = formState;

    const onSubmit = (data:FormValues) =>{
        data.timestamp=new Date()
        console.log('Form submitted', data);
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>

                <label htmlFor="from">From</label>
                <input
                    type="number"
                    id="from"
                    {...register(
                        "from",
                        {required:{
                            value:true,
                            message:"req"
                        },
                        validate: {
                            greaterThanTo: (fieldValue) => {
                                var to = getValues("to");
                                if (!to){
                                    to="-1";
                                }
                                return(
                                    fieldValue > to || "must be greater than 'To'"
                                );
                            }
                        }
                    }
                    )}
                />

                <p>{errors.from?.message}</p>
                <label htmlFor="from">To</label>
                <input
                    type="number"
                    id="to"
                    {...register(
                        "to",
                        {required:{
                            value:true,
                            message:"req"
                        },
                        validate: (fieldValue) => {
                            var from = getValues("from");
                            if (!from){
                                from="-1"
                            }
                            return(
                                fieldValue < from || "must be less than 'from'"
                            );
                        }
                        }
                    )}
                />
                <p>{errors.to?.message}</p>

                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" {...register(
                    "email",
                    {
                        required:{
                            value:true,
                            message:"email req"
                        },
                        pattern: {
                        value:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        message: 'invalid email'
                    }}
                    )}
                />
                <p>{errors.email?.message}</p>


                <button>Submit</button>
            </form>
        </div>
    );
};