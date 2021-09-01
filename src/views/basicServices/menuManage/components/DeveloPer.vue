<template>
  <div class="DeveloPer">
    <div class="header_btns">
      <div class="ovhi mgr3">
        <div class="fr">
          菜单名称 <i></i>
          <el-input
            class="k_input"
            placeholder="请输入菜单名称"
            v-model="searchContent"
          ></el-input
          ><i></i>
          <button class="md_bt_gy"  @click="initD(searchContent)">
            查询
          </button>
        </div>
      </div>
      <div class="Peripheral mt20">
        <div class="ovhi bosa-98ABC2 Peripheral_box">
          <div class="fr Peripheral_line mgr3">
            <button class="md_bt_df" @click="increase()" v-if="form.parentId==4?false:true">
              添加
            </button>
            <i></i>
            <button class="md_bt_gy" @click="onRemove()">
              删除
            </button>
          </div>
        </div>
        <div class="Authority ovhi">
          <div class="wp25 hp100 Authority_limits fl">
            <el-tree :data="purview" :props="defaultProps" @node-click="handleNodeClick" class="tree" :filter-node-method="filterNode"
            ref="treeu"></el-tree>
          </div>
          <div class="wp75 fl hp100">
            <div class="hp90 wp60 Authority_range ">
                <el-form ref="form" :model="form" label-width="80px" label-position="left" size="medium">
                <el-form-item label="所属系统">
                  <div>{{'开发者平台'}}</div>
                </el-form-item>    
                <el-form-item label="节点位置" v-if="lopersta" class="Classified">
                  <el-select v-model="layer1" v-if="website1" class="fl wp33">
                  </el-select>
                  <el-select v-model="layer2" v-if="website2" class="fl wp33">
                  </el-select>
                  <el-select v-model="layer3" v-if="website3" class="fl wp33">
                  </el-select>
                </el-form-item>
                <el-form-item :label="first+'名称'">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item :label="first+'code'">
                  <el-input  v-model="form.code"></el-input>
                </el-form-item>
                <el-form-item label="路径">
                    <el-input v-model="form.component"></el-input>
                </el-form-item>
                <el-form-item label="url">
                    <el-input v-model="form.url"></el-input>
                </el-form-item>
                <el-form-item label="排序">
                  <el-input v-model="form.sort"></el-input>
                </el-form-item>
                <el-form-item label="权限状态">
                  <el-radio-group v-model="form.status">
                    <el-radio :label="1">启用</el-radio>
                    <el-radio :label="0">禁用</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="显示状态">
                  <el-radio-group v-model="form.visible">
                    <el-radio :label="1">启用</el-radio>
                    <el-radio :label="0">禁用</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="图标">
                  <el-upload
                    class="upload-demo"
                    action=""
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img src="@img/IMG.png" alt="" srcset=""
                    :limit="1">
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                  </el-dialog>
                </el-form-item>
              </el-form>
            </div>
            <div class="hp10 wp100 DeveloPer_passage" >
              <div class="sjc  hp100">
                <button class="md_bt_df mgr5" @click="onCancel">
                  取消
                </button>
                <i></i>
                <button class="md_bt_gy mgr5" @click="ondefine()">
                  确定
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  MenuManagement,
  MenuroleApi,
  MenuModification
} from "@/api/menu";
export default {
  name: "DeveloPer",
  props: {
  },
  // props: ["_show", "_datas", "_type"],
  data() {
    return {
      searchContent: null,
      purview:[],
      first:'目录',
      lopersta:false,
      website1:false,
      website2:false,
      website3:false,
      certain:'',
      layer1:'',
      layer2:'',
      layer3:'',
      form: {
        name: '',
        code:'',
        component:'',
        sort:'',
        status:'',
        visible:'',
        icon: '',
        url:'',
      },
      multipartFile:null,
      defaultProps: {
        children: 'children',
        label: 'title',
      },
      dialogImageUrl: '',
      dialogVisible: false
    };
  },
  watch: {
    
  },
  created() {
    this.initial();
  },
  methods: {
    initial(){
      MenuManagement({
        queryMode: "list",
      }).then(r => {
        console.log(r,'返回的是')
        if (r.code == 200) {
          this.purview = r.data;
        }
      });
    },
    initD(val){
      console.log(val,'查看')
      this.$refs.treeu.filter(val);
    },
    increase(val){
       console.log(this.certain,'添加')
      if(this.certain==''){
       return this.$message.error('请先勾选需要添加的层级');
      }
      this.form={name: '',component:'',sort:'',status:'',visible:'',desc: ''},
      this.lopersta=false;
    },
    handleAvatarSuccess(res, file) {
      // console.log(file);
      this.multipartFile=file
      this.form.icon = URL.createObjectURL(file.raw);
    },
    onRemove(){
      console.log(this.certain,'查看删除')
      if(this.certain==''){
        this.$message.error('请先勾选需要删除的层级');
      }else if(!this.certain.children ){
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });  
        });  
      }else if (this.certain.children.length!=0){
        
        this.$message.error('请先删除子级菜单');
      }

    },
    ondefine(){
      console.log(this.certain,'确认',this.form,this.multipartFile)
      MenuroleApi({
        component: this.form.component,
        icon: this.form.icon,     
        name: this.form.name,     
        path: this.form.component,     
        redirect: "", 
        sort: this.form.sort,      
        status: this.form.status,    
        title:this.form.name,    
        type: this.certain.type,     
        url: this.form.url,     
        visible: this.form.sort,    
        parentId: this.certain.id,
       }).then(r => {
        console.log(r,'新增返回的是')
        if (r.code == 200) {
          this.initial()
        }
      });
    },
    onCancel(){

    },
    filterNode(value, purview,node) {
      // console.log(value, purview,'156465****',node)
      if (!value) return true;
      return node.label.indexOf(value) !== -1;
    },
    handleNodeClick(data) {
      this.form=data
      this.certain=data
      console.log(data,'点击',this.form);
      switch (data.type) {
        case '1':
          this.first='目录'
          break;
        case '2':
          this.first='菜单'
          break;
        case '3':
          this.first='目录'
          break;
        case '4':
          this.first='目录'
          break;
        default:
          this.first=''
          break;
      }
      switch (data.parentId) {
        case '1':
          this.lopersta=true
          this.website1=true
          this.layer1='基础服务'
          break;
        case '2':
          this.lopersta=true
          this.website1=true
          this.website2=true
          this.layer1='基础服务'
          this.layer1='用户管理'
          break;
        case '3':
          this.lopersta=true
          this.website1=true
          this.website2=true
          this.layer1='基础服务'
          this.layer1='角色管理'
          break;
        case '4':
          this.lopersta=true
          this.website1=true
          this.website2=true
          this.layer1='基础服务'
          this.layer1='菜单管理'
          break;
          case '5':
          this.lopersta=true
          this.website1=true
          this.website2=true
          this.layer1='基础服务'
          this.layer1='数据字典'
          break;
          case '26':
          this.lopersta=true
          this.website1=true
          this.website2=true
          this.layer1='基础服务'
          this.layer1='园区管理'
          break;
          case '27':
          this.lopersta=true
          this.website1=true
          this.website2=true
          this.layer1='基础服务'
          this.layer1='APP用户'
          break;
        default:
          this.lopersta=false
          break;
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList,'第一');
    },
    handlePictureCardPreview(file) {
      console.log(file, fileList,'第二');
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    beforeAvatarUpload(file) {
      console.log(file,'图标')
      // const isJPG = file.type === 'image/jpeg';
      // const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!');
      // }
      // return isJPG && isLt2M;
    }
  }
};
</script>
<style lang="scss">
.Classified{
  .el-input__inner {
    line-height: 30px;
    height: 30px;
  }
  .el-input__icon {
    line-height: 30px;
  }
}
  .Authority_limits{
    .el-tree-node__expand-icon.expanded {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    .el-icon-caret-right:before {
      content: "\e6df" !important;
      font-size: 16px !important;
    }
    .el-tree-node__expand-icon.expanded.el-icon-caret-right:before {
      content: "\e6e0" !important;
      font-size: 16px !important;
    }
  }
  
  .upload-demo{
    border: none;
    background-color: #FFFFFF;
    .el-upload--picture-card{
      width: 0;
      height: 0;
    }
  }
</style>
<style  lang="scss" scoped>
.DeveloPer {
  i {
      padding: 0 5px;
    }
  .header_btns {
    height: calc(100vh - 170px) ;
    .Peripheral{
      width: 99%;
      margin-left: 1px;
      background: #FFFFFF;
      border-radius: 5px;
      box-shadow: 0px 0px 3px 0px #98ABC2;
      height: calc(100vh - 250px) ;
      .Peripheral_box{
        background: #F7F8FA;
      }
      .Peripheral_line{
        padding:15px  0px 15px 0;
      }
      .Authority{
        width: 100%;
        height: 91.6%;
        .Authority_limits{
          padding-top: 5px;
          height: 100%;
          padding-left:20px;
          box-shadow: 0px 2px 2px 0px #98ABC2;
        }
        .Authority_range{
          padding: 5% 0 0 10%;
          height: 80%;
          .el-form-item{
            margin-bottom:5px
          }
          
        }
        .DeveloPer_passage{
          height: 20%;
          // border-top: 1px solid #909090;
          margin-left: 1px;
          box-shadow: 0px 0px 2px 0px #98ABC2;
        }
      }
    }
  }
}

</style>
