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
import { UserStoreService } from 'src/app/global-services/store-service/user-service.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class CreateProjectComponent implements AfterViewInit {

  @ViewChild('editor', { read: ElementRef })
  
  editorElement: ElementRef | undefined;

  @ViewChild('textareaElement') textareaElement: ElementRef | undefined;

  private editor: EditorJS | undefined;

  title : String = "";
  tagInput : String = "";
  tags: Array<String> = [];
  dbTags: Array<String> = [];
  imagePreview: String | ArrayBuffer ="https://penji.co/wp-content/uploads/2021/07/What-is-an-Illustration-Project-and-How-Do-I-Order-One.jpg";

  constructor(private v : ProjectService = inject(ProjectService) , private readonly userStore: UserStoreService) { }

  ngAfterViewInit(): void {
    this.initializeEditor();
    this.getDBTags();

  }


  addTag(event: KeyboardEvent){
    if(event.key==="Enter"){
      if(this.tagInput!=="" && this.tags.length<5){
        this.tags.push(this.tagInput);
        this.tagInput="";
      }
    }
  }

  async getDBTags(){
    this.dbTags =  await this.v.getTags();
  }

  deleteTag(index: number){
    this.tags.splice(index,1);
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
    // if(this.tags.length!==0){
    //   const output = JSON.stringify({
    //     user_id: this.userStore.userId,
    //     key: this.userStore.key,
    //     post_tags: this.tags
    //   });
    //   await this.v.postTags(output);
    // }

    if(this.imagePreview==="https://penji.co/wp-content/uploads/2021/07/What-is-an-Illustration-Project-and-How-Do-I-Order-One.jpg"){
      console.warn('Please select a project thumbnail');
    }else if(this.title===""){
      console.warn('Please enter a valid title');
    }else if(this.tags.length===0){
      console.warn("Please enter atleast one tag");
    }else{
      this.editor?.save().then(async data => {
        console.dir(data);
        const value = JSON.stringify(data);
        const output = JSON.stringify({
          heading : this.title,
          thumbnail_url : "testing",
          body : JSON.stringify(data),
          user_id : this.userStore.userId,
          key : this.userStore.key,
          tags : this.tags
        });
        await this.v.postBlog(output);
      })
    }
    
  }
}
