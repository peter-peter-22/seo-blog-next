import FormTextField from '@/app/ui/forms/components/FormTextField';
import LiveAvatar from './LiveAvatar';

export default function UpdateProfile() {
    return (
        <>
            <LiveAvatar />
            <FormTextField name="name" label="Name" fullWidth />
            <FormTextField name="description" label="Description" placeholder="Write something about yourself" fullWidth multiline minRows={2} />
            <FormTextField name="image" label="Profile picture" fullWidth />
        </>
    );
}