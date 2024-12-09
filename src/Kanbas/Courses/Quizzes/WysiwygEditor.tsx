import { Editor } from '@tinymce/tinymce-react';

// Props definition for WysiwygEditor
interface WysiwygEditorProps {
    value: string;
    onChange: (content: string) => void;
}

export default function WysiwygEditor({ value, onChange }: WysiwygEditorProps) {

    const stripHtml = (html: string): string => {
        const temporalDivElement = document.createElement("div");
        temporalDivElement.innerHTML = html;
        return temporalDivElement.textContent || temporalDivElement.innerText || "";
    }

    return (
        <div>
            <Editor
                apiKey='zna9br51xr72r5w5buskuq9m77td9rb1np52rcui1vyoroh5'
                initialValue="Start typing here..."
                value={stripHtml(value)}
                init={{
                    height: 300,
                    menubar: 'file edit view insert format tools table help',
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar: 'fontsizeselect fontselect | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    font_formats: 'Andale Mono=andale mono,times;' +
                        'Arial=arial,helvetica,sans-serif;' +
                        'Arial Black=arial black,avant garde;' +
                        'Book Antiqua=book antiqua,palatino;',
                    fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt'
                }}
                onEditorChange={(content, editor) => onChange(stripHtml(content))}
            />
        </div>
    );
}


// export default function WysiwygEditor() {
//     return (
//         <div>
//             <Editor
//                 apiKey='5x8r05jh2cze0tnc0ca657e55x2pd9uh3d564zcndfmnu7sh'
//                 initialValue="Start typing here..."
//                 init={{
//                     height: 300,
//                     menubar: 'file edit view insert format tools table help',
//                     plugins: [
//                         'advlist autolink lists link image charmap print preview anchor',
//                         'searchreplace visualblocks code fullscreen',
//                         'insertdatetime media table paste code help wordcount'
//                     ],
//                     toolbar: 'fontsizeselect fontselect | formatselect | ' +
//                         'bold italic backcolor | alignleft aligncenter ' +
//                         'alignright alignjustify | bullist numlist outdent indent | ' +
//                         'removeformat | help',
//                     font_formats: 'Andale Mono=andale mono,times;' +
//                         'Arial=arial,helvetica,sans-serif;' +
//                         'Arial Black=arial black,avant garde;' +
//                         'Book Antiqua=book antiqua,palatino;',
//                     fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt'
//                 }}
//                 onEditorChange={(content: any, editor: any) => {
//                     console.log('Content was updated:', content);
//                 }}
//             />
//         </div>
//     );
// }
