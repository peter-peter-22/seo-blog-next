import { PlateEditor } from '@/components/editor/plate-editor';
import Card from '@mui/material/Card';
import { SingleColumn } from '../ui/layout/Layouts';

export default function Page() {
  return (
    <SingleColumn>
      <Card className="h-screen w-full" data-registry="plate">
        <PlateEditor />
      </Card>
    </SingleColumn>
  );
}
