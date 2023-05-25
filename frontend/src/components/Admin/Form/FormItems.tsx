import { Button, Form, Input, InputNumber, Switch, Select, Row, Typography } from 'antd';
import { createContext, useEffect, useState } from "react";
import { FormDataProps, FormItemsProps, FormValueProps } from "./types";
// import { ImageUpload } from "./ImageUpload";
// import { MutipleImageUploader } from "./ImageUploader";


export const FormItemsContext = createContext<FormDataProps>({
    setImageIsUploading: (value: boolean) => { },
    setImageUrlList: (value: string[]) => { },
    imageUrlList: [] as string[],
    imgIsUploading: false,
    setFormData: (value: FormDataProps) => { },
    form: {},
    frm: {},
    role: {},
});


export const FormItems = ({
    form,
    frm,
    role,
    setFormData,

}: FormItemsProps) => {
    // Password
    const [passwordShow, setPasswordShow] = useState<boolean>(false)
    const handleShowPassword = () => setPasswordShow(!passwordShow)
    // Image Upload
    // const [imgIsUploading, setImageIsUploading] = useState(false);
    // const [imageUrlList, setImageUrlList] = useState<string[]>([]);
    // Checkbox

    const renderFormItem = () => {
        switch (frm.type) {
            case 'checkbox':
                return (
                    <>TODO</>
                )
            case 'password':
                return (
                    <Input.Group>
                        <Input
                            placeholder={frm.placeholder}
                            value={form[frm.key]}
                            onChange={(e) => {
                                setFormData((prev: FormDataProps) => ({ ...prev, [frm.key]: e.target.value }));
                            }}
                            type={passwordShow ? 'text' : 'password'}
                        />
                        <Input width='4.5rem'>
                            <Button onClick={handleShowPassword}>
                                {passwordShow ? 'Hide' : 'Show'}
                            </Button>
                        </Input>
                    </Input.Group>
                )
            // case 'image':
            //     return (
            //         <>
            //             <MutipleImageUploader
            //                 maxCount={5}
            //                 isRequired={role?.required}
            //             />
            //         </>
            //     )
            // case 'singleImage':
            //     return (
            //         <>
            //             <MutipleImageUploader
            //                 maxCount={1}
            //                 isRequired={role?.required}
            //             />
            //         </>
            //     )
            case 'switch':
                return (
                    <Switch checked={form[frm.key]}
                        onChange={(value) => { setFormData((prev: FormDataProps) => ({ ...prev, [frm.key]: value })); }
                        } />
                );
            case 'text':
                return (
                    <Input
                        placeholder={frm.placeholder}
                        value={form[frm.key]}
                        onChange={(e) => {
                            setFormData((prev: FormDataProps) => ({ ...prev, [frm.key]: e.target.value }));
                        }}
                    />
                );
            case 'number':
                return (
                    <Row>
                        <Typography.Title>{frm.label}</Typography.Title>
                        <InputNumber
                            placeholder={frm.placeholder}
                            value={form[frm.key]}
                            onChange={
                                (value) => {
                                    setFormData((prev: FormDataProps) => ({ ...prev, [frm.key]: value }));
                                }
                            }
                            min={frm.min} />
                    </Row>
                );
            case 'editor':
                return (
                    <Input.TextArea
                        placeholder={frm.placeholder}
                        value={form[frm.key]}
                        onChange={(e) => {
                            setFormData((prev: FormDataProps) => ({ ...prev, [frm.key]: e.target.value }));
                        }}
                    />
                )
            case 'options':
                return (
                    <Select
                        placeholder={frm.placeholder}
                        value={form[frm.key]}
                        onChange={(e) => {
                            setFormData((prev: FormDataProps) => ({ ...prev, [frm.key]: e.target.value }));
                        }}
                    >
                        {frm.values?.map((item: FormValueProps) => {
                            return (
                                <option value={item.value}>{item.text}</option>)
                        }
                        )}

                    </Select>
                )
        }
    }
    return (
        <FormItemsContext.Provider value={{
            // setImageIsUploading: setImageIsUploading,
            // setImageUrlList: setImageUrlList,
            // imageUrlList: imageUrlList,
            // imgIsUploading: imgIsUploading,
            form: form,
            frm: frm,
            role: role,
            setFormData: setFormData,
        }}>
            <Form.Item 
            label={frm.label}
            >
                {renderFormItem()}
            </Form.Item>
        </FormItemsContext.Provider>
    )
}
