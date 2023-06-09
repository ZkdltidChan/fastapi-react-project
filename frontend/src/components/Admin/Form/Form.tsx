import React, { useState, useEffect, useRef } from 'react';
import { Button, Row, Typography } from 'antd';
import { FormItems } from './FormItems';
import { FormProps, FormDataProps, FormTypeProps, FrmProps } from './types';
import { useNavigate } from 'react-router-dom';
import useAxios from '../../../hooks/useAxios';

export const FormContext = React.createContext({
    setImageIsUploading: (value: boolean) => { },
    setImageUrlList: (value: string[]) => { },
    imageUrlList: [] as string[],
    imgIsUploading: false,
});
export const Form = <T,>({ ...props }: FormProps<T>) => {
    const {
        headers = {},
        title = '',
        isNew = false,
        rules = {},
        formData = {},
        formType = [],
        api = '',
        callbackUrl = null,
        hasUpdate = false,
        hasPreview = false,
        hasDelete = false,
        hasBack = false,

        hasToast = true,
        totastTitle = 'Create Success',
        totastDescription = '',

        submitButtonTitle = 'Submit',
        updateButtonTitle = 'Update',
        deleteButtonTitle = 'Delete',
    } = props;

    const { fetchData, response, isLoading, error } = useAxios<T>()
    const [imgIsUploading, setImageIsUploading] = useState(false);
    const [imageUrlList, setImageUrlList] = useState<string[]>([]);

    const navigate = useNavigate();
    // const toast = useToast()
    // default the props

    const initForm = (formType: FormTypeProps[], formData: FormDataProps) => {
        // 如果有form data, 將form data 塞入form

        const frm: FrmProps = {};
        if (formData.id) {
            frm.id = formData.id;
        }
        formType.forEach((h) => {
            frm[h.key] = formData[h.key];
        });
        console.log(frm)
        return frm;
    }

    const [form, setForm] = useState(() => initForm(formType, formData));
    const frmRef = useRef(null);
    useEffect(() => {
        setForm(initForm(formType, formData));
        console.log(form)
    }, []);


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(form)
        console.log(api)
        if (form.id && form.id > 0) {
            await fetchData('PATCH', api, form, headers)
        } else {
            await fetchData('POST', api, form, headers)
        }
    }

    // useEffect(() => {
    //     console.log('imageUrlList', imageUrlList)
    //     console.log('imgIsUploading', imgIsUploading)
    // }, [imageUrlList, imgIsUploading])

    return (
        <FormContext.Provider value={{
            setImageIsUploading: setImageIsUploading,
            setImageUrlList: setImageUrlList,
            imageUrlList: imageUrlList,
            imgIsUploading: imgIsUploading,
        }}>
            <Row>
                <form
                    ref={frmRef}
                    onSubmit={handleSubmit}
                >
                    {title && <Typography.Title>{title}</Typography.Title>}
                    {formType.map((frm) => (
                        <FormItems
                            key={frm.key}
                            role={rules[frm.key]}
                            frm={frm}
                            form={form}
                            setFormData={setForm}
                        />
                    ))}
                    <br />
                    <Row justify='center'>
                        {
                            hasBack && (<Button onClick={() => navigate(-1)}>Back</Button>)
                        }
                        {
                            hasDelete && form['id'] && (
                                <Button> {deleteButtonTitle} </Button>
                            )
                        }
                        {
                            hasUpdate && (
                                <Button loading={isLoading} htmlType="submit">
                                    {form.id ? updateButtonTitle : submitButtonTitle}
                                </Button>
                            )
                        }
                        {
                            hasPreview && (
                                <Button> Preview </Button>
                            )
                        }
                    </Row>
                </form>
            </Row>
        </FormContext.Provider>
    );
};
