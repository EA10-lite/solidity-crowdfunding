
import { Button, FormField, Loader } from "../../components";
// import { checkIfImage } from "../../utils";
import { money } from "../../assets";
import { useState, type FormEvent } from "react";

interface FormData {
    name: string;
    title: string;
    description: string;
    target: number;
    deadline: string;
    image: string;
}

const CreateCampaign = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [form, setForm] = useState<FormData>({
        name: '',
        title: '',
        description: '',
        target: 0,
        deadline: '',
        image: '',
    })
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            setIsLoading(true);
            console.log("e", e.target);
        } catch (error) {
            console.log("error:", error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleFormFieldChange = (fieldName: string, value: string) => {
        setForm({ ...form, [fieldName]: value })
    }
    return (
        <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
            {isLoading && <Loader />}
            <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
                <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Start a Campaign</h1>
            </div>

            <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
                <div className="flex flex-wrap gap-[40px]">
                <FormField
                    label="Your Name *"
                    placeholder="John Doe"
                    type="text"
                    value={form.name}
                    handleChange={(e) => handleFormFieldChange('name', e)}
                />
                <FormField 
                    label="Campaign Title *"
                    placeholder="Write a title"
                    type="text"
                    value={form.title}
                    handleChange={(e) => handleFormFieldChange('title', e)}
                />
                </div>

                <FormField
                    label="Story *"
                    placeholder="Write your story"
                    type="text"
                    isTextArea
                    value={form.description}
                    handleChange={(e) => handleFormFieldChange('description', e)}
                />

                <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
                <img src={money} alt="money" className="w-[40px] h-[40px] object-contain"/>
                <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">You will get 100% of the raised amount</h4>
                </div>

                <div className="flex flex-wrap gap-[40px]">
                <FormField
                    label="Goal *"
                    placeholder="ETH 0.50"
                    type="text"
                    value={form.target}
                    handleChange={(e) => handleFormFieldChange('target', e)}
                />
                <FormField
                    label="End Date *"
                    placeholder="End Date"
                    type="date"
                    value={form.deadline}
                    handleChange={(e) => handleFormFieldChange('deadline', e)}
                />
                </div>

                <FormField
                    label="Campaign image *"
                    placeholder="Place image URL of your campaign"
                    type="url"
                    value={form.image}
                    handleChange={(e) => handleFormFieldChange('image', e)}
                />

                <div className="flex justify-center items-center mt-[40px]">
                    <Button
                        btnType="submit"
                        title="Submit new campaign"
                        styles="bg-[#1dc071]"
                    />
                </div>
            </form>
        </div>
    )
}

export default CreateCampaign;