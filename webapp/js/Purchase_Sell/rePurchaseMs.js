//  自定义方法 上传图片 限制6张
function  uploadDetailImg(file) {
  //file为点击上传时返回的文件内容
    let formData = new FormData();
    // 定义传递参数第一个值为参数名 第二个为值
    formData.append("appMiniFile", file.file);
    formData.append("type", "02");
    formData.append("token", this.token);
    // 调用上传图片的接口
    uploadPicture(formData).then((res) => {
    // 成功时拿到res中的url 赋值
      res.value = res.url;
      // 图片必传校验
      this.$set(this.form, "detailImg", res.url);
      // 上传后去掉必传提示
      this.$refs["form"].validateField("detailImg");
      // 将接口返回的数据res push到展示图片的fileList中
      this.fileList.push(res);
    });
  }
  
// 移除图片操作
class handleRemove {
  constructor(file, fileList) {
    // fileList为移除后剩余的图片数组 赋值给this.fileList 则展示正确
    this.fileList = fileList;
    // 上传图片 > 6 则隐藏上传组件
    this.hideUploadBtn = fileList.length >= 6;
  }
}

// 最多上传6张图，超过时隐藏上传按钮
class handleEditChange {
  constructor(file, fileList) {
    this.hideUploadBtn = fileList.length >= 6;
  }
}

