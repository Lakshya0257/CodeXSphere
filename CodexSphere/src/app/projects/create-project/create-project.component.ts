// @ts-ignore
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation, inject } from '@angular/core';
import EditorJS, { ToolConstructable, BlockToolConstructable, InlineToolConstructable } from '@editorjs/editorjs';
import Header from '@editorjs/header';
// @ts-ignore
import SimpleImage from '@editorjs/simple-image';
// @ts-ignore
import CodeTool from '@editorjs/code';
// @ts-ignore
import InlineCode from '@editorjs/inline-code';
// @ts-ignore
import Embed from '@editorjs/embed';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
  encapsulation:ViewEncapsulation.Emulated
})
export class CreateProjectComponent implements AfterViewInit {

  @ViewChild('editor', { read: ElementRef })
  
  editorElement: ElementRef | undefined;

  @ViewChild('textareaElement') textareaElement: ElementRef | undefined;

  private editor: EditorJS | undefined;

  title : String = "";
  imagePreview: String | ArrayBuffer ="https://penji.co/wp-content/uploads/2021/07/What-is-an-Illustration-Project-and-How-Do-I-Order-One.jpg";

  constructor(private v : ProjectService = inject(ProjectService)) { }

  ngAfterViewInit(): void {
    this.initializeEditor();
  }

  handleTitle(event:any):void{
    const maxCharacters = 100; // Define your maximum character limit
    this.title = event.target.textContent;

    if (this.title.length > maxCharacters) {
      event.target.textContent = this.title.slice(0, 100);
      this.setCursorToEnd();
      // Optionally, you could show a message to the user indicating the limit has been reached
    }
  }

  setCursorToEnd() {
    if (this.textareaElement) {
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(this.textareaElement.nativeElement);
      range.collapse(false);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }

  onImageInputChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imagePreview = reader.result ?? '';
      console.log(this.imagePreview);
    };
  }

  private initializeEditor() {
    this.editor = new EditorJS({
      minHeight: 200,
      holder: this.editorElement?.nativeElement,
      placeholder: 'Let`s start writing!',
      tools: {
        image: SimpleImage,
        header: {
          // @ts-ignore
          class: Header as InlineToolConstructable,
          inlineToolbar : true
        },
        code: CodeTool,
        inlineCode: {
          class: InlineCode,
          shortcut: 'CMD+SHIFT+M',
        },
        embed: {
          class: Embed,
          inlineToolbar: true,
          config: {
            services: {
              youtube: true,
              coub: true
            }
          }
        },
      }
    });
  }
 
  saveData() {
    if(this.imagePreview==="https://penji.co/wp-content/uploads/2021/07/What-is-an-Illustration-Project-and-How-Do-I-Order-One.jpg"){
      console.warn('Please select a project thumbnail');
    }else if(this.title===""){
      console.warn('Please enter a valid title');
    }else{
      this.editor?.save().then(data => {
        console.dir(data);
        const value = JSON.stringify(data);
        const output = JSON.stringify({
          heading : this.title,
          thumbnail_url : "testing",
          body : JSON.stringify(data),
          userId : '44545',
          key : "4554484"
        });
        this.v.postBlog(output);
      })
    }
    
  }
}
