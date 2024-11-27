import FormTextField from '@/app/ui/forms/components/FormTextField';

export default function UpdateProfile() {
    return (
        <>
            <FormTextField name="name" label="Name" fullWidth />
            <FormTextField name="description" label="Description" placeholder="Write something about yourself" fullWidth multiline minRows={2}/>
            <FormTextField name="image" label="Profile picture" fullWidth />
        </>
    );
}