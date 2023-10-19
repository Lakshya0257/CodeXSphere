import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { privateDecrypt } from 'crypto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  //create a new tag
  async create(createTagDto: CreateTagDto) {
    let newTags: Tag[] = [];
      for(const name of createTagDto.tags){
        let tag: Tag = new Tag();
        tag.blogs=[];
        tag.tag=name;
        newTags.push(await this.tagRepository.save(tag));
      }
      return newTags;
  }

  //getAllTags
  async findAll() {
    const tags: Tag[] = await this.tagRepository.find();
    return tags;
  }

  //for filter function on homeline
  async findOne(id: string) {
    const tag: Tag = await this.tagRepository.findOne({ where: {tag : id}})
    return tag;
  }

  async update(updateTagDto: UpdateTagDto) {
    
    for(const tagId of updateTagDto.tags){
      const tag = await this.tagRepository.findOne({where: {tag : tagId}});
      tag.blogs.push(updateTagDto.blog_id);
      await this.tagRepository.update({tag: tagId}, tag);
    }
    return {
      status : "Success"
    }
  }

  async updateTagsWithUnknown(updateTagDto: UpdateTagDto){
    for(const tagId of updateTagDto.tags){
      const tag = await this.tagRepository.findOne({where: {tag : tagId}});
      if(tag===null){
        let newTag = new Tag();
        newTag.tag=tagId;
        let arr: string[] = [tagId];
        newTag.blogs=arr;
        await this.tagRepository.save(newTag);
      }else{
        tag.blogs.push(updateTagDto.blog_id);
        await this.tagRepository.update({tag: tagId}, tag);
      }
      
    }
    return {
      status : "Success"
    }
  }
}
