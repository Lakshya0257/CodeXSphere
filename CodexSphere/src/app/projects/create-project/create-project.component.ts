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
import { NgxImageCompressService } from 'ngx-image-compress';
import { HelperService } from 'src/app/global-services/helper/helper.service';
import { Router } from '@angular/router';

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
  blog_id : string = "";
  data: any;
  imagePreview: String | ArrayBuffer ="https://penji.co/wp-content/uploads/2021/07/What-is-an-Illustration-Project-and-How-Do-I-Order-One.jpg";

  constructor(private v : ProjectService = inject(ProjectService) , private readonly userStore: UserStoreService, private imageCompress: NgxImageCompressService, private helperService: HelperService, private router: Router) { 
    const navigation = this.router.getCurrentNavigation();
    if (navigation!.extras.state) {
      const data = navigation!.extras.state['data'];
      this.imagePreview=data.thumbnail.image;
      this.blog_id=data.blog_id;
      this.data=JSON.parse(data.body.body);
      this.title=data.title;
      for(const tag of data.tags){
        this.tags.push(tag.tag_name);
      }
      console.log(navigation!.extras.state['data']);
    }
  }

  ngAfterViewInit(): void {
    this.initializeEditor();
    if(this.title!==""){
      this.textareaElement!.nativeElement.innerHTML=this.title;
    }

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

  // onImageInputChange(event: any) {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = () => {
  //     this.imagePreview = reader.result ?? '';
  //     console.log(this.imagePreview);
  //   };
  // }

  onImageInputChange() {
    this.imageCompress.uploadFile().then(({image, orientation}) => {
        console.log('Size in bytes of the uploaded image was:', this.imageCompress.byteCount(image));

        this.imageCompress
            .compressFile(image, orientation, 50, 50) // 50% ratio, 50% quality
            .then(compressedImage => {
                this.imagePreview=compressedImage;
                console.log('Size in bytes after compression is now:', this.imageCompress.byteCount(compressedImage));
            });
    });
}

private initializeEditor() {
  this.editor = new EditorJS({
    minHeight: 200,
    holder: this.editorElement?.nativeElement,
    placeholder: 'Let`s start writing!',
    data: this.data,
    tools: {
      image: SimpleImage,
      header: {
        // @ts-ignore
        class: Header as InlineToolConstructable,
        inlineToolbar: true,
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
            coub: true,
          },
        },
      },
    },
    onChange: () => {
      this.checkBlockCount(); // Check the number of blocks whenever content changes
    },
  });
}

// Function to check and restrict the number of blocks
private async checkBlockCount() {
  const maxBlocks = 20; // Set your desired maximum number of blocks here
  const currentBlocks = this.editor?.blocks.getBlocksCount();

  if (currentBlocks! > maxBlocks) {
    
    this.data= await this.editor?.save();
    await this.editor?.blocks.clear();
    this.editor?.render(this.data);
    
  }
}
 
  saveData() {
    // if(this.imagePreview==="https://penji.co/wp-content/uploads/2021/07/What-is-an-Illustration-Project-and-How-Do-I-Order-One.jpg"){
    //   console.warn('Please select a project thumbnail');
    // }else 
    if(this.title===""){
      console.warn('Please enter a valid title');
    }else if(this.tags.length===0){
      console.warn("Please enter atleast one tag");
    } 
    else if(this.editor?.blocks.getBlocksCount()===undefined){
      this.helperService.showSnackbar("Please enter atleast one block")
    }
    else if(this.editor?.blocks.getBlocksCount()>20){
      this.helperService.showSnackbar("Max number of blocks exceeded, please remove the blocks")
    }
    else{
      this.editor?.save().then(async data => {
        console.dir(data);
        const value = JSON.stringify(data);
        const output = JSON.stringify({
          "user_id": this.userStore.userId,
          "key": this.userStore.key,
          "thumbnail_url":"https://www.hindustantimes.com/ht-img/img/2023/08/07/1600x900/Ragdoll_1691391098967_1691391099171.jpg",
          "body":data,
          "title":this.title,
          "tags":this.tags
      });
      if(this.blog_id===""){
        await this.v.postBlog(output);
      }else{
        await this.v.updateBlog(output, this.blog_id);
      }
        
      })
    }
    
  }
}
