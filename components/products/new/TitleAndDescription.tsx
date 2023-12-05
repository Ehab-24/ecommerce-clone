import TextArea from '../../TextArea'
import Input from '../../Input'
import Card from '../../Card'

export default function TitleAndDescription() {
    return (
        <Card className="flex flex-col gap-4 items-stretch">
            <Input label="Title" placeholder="Title" />
            <TextArea label="Description" />
        </Card>
    )
}
