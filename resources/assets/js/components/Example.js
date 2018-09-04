import React, { Component } from 'react';
import ReactDOM from 'react-dom';

'use strict';

function AppHeader(props){
  return(
    <div className="app-header">
      <div className="search-bar-area">
        <input
          type="text"
          placeholder="search"
          value={ props.searchTarget }
          onChange={ props.changeToSearchMode }
        />
      </div>
      <div className="create-btn-area">
        <input type="button" value="新規作成" onClick={ props.changeToCreateMode }/>
      </div>
    </div>
  );
};

function Memo (props){
  // <div className="content">{ props.memo_data.content }</div>
    return(
      <div className="prev-memo" data-id={ props.memo_data.id } onClick={ props.showMemo } >
        <div className="overview">
          <div className="title">{ props.memo_data.title }</div>
        </div>
        <div className="dates">
          <div className="created_date">from:{ props.memo_data.created_at }</div>
          <div className="updated_date">last:{ props.memo_data.updated_at}</div>
        </div>
      </div>
    );
}

function Memos(props){
  const memos = props.memo_datas.map( ( memo_data , index ) => {
    // console.log(index);
    return(
      <Memo
        memo_data={ memo_data }
        key={ index }
        showMemo={ props.showMemo }
      />
    );
  });

  return(
    <div className="prev-memos" >
      { memos }
    </div>
  );
}

function LeftSideBar (props){
  let prevMark = [] ;
  if( props.app_mode !== "prev" &&
      props.app_mode !== "search_prev" ){
    prevMark.push(
      <div
        className="back-to-prev"
        onClick={ props.backToPrev }>
        ◀
      </div>
    );
  }
  return(
    <div className="left-sidebar">
      { prevMark }
    </div>
  );
}

function CenterBar (props){
  let contents = [] ;
  switch( props.app_mode ){
    case "prev":
      if( props.memo_datas.length > 0 ){
        contents.push(
          <Memos
            memo_datas={props.memo_datas}
            showMemo={ props.showMemo }
          />
        );
      }else{
        contents.push(
          <div className="empty-memo" >メモはありません</div>
        );
      }
      break;
    case "search_prev":
        const search_datas = props.memo_datas.filter( memo_data =>{
          return memo_data.title.toLowerCase().includes( props.searchTarget ) ;
        });
        if( search_datas.length > 0){
        contents.push(
          <Memos
            memo_datas={ search_datas }
            showMemo={ props.showMemo }
          />
        );
      }else{
        contents.push(
          <div className="empty-memo" >検索結果はありません</div>
        );
      }
      break;
    case "create":
      contents.push(
        <div className="create-memo">
          <input
            type="text"
            className="input-title"
            value={ props.create_data_title}
            placeholder="title..."
            onChange={ props.inputNewTitle }
          />
          <textarea
            className="input-content"
            onChange={ props.inputNewContent }
            placeholder="content..."
          >{ props.create_data_content }</textarea>
          <input
            type="button"
            value="新規作成"
            className="save-memo"
            onClick={ props.createNewMemo }
          />
        </div>
      );
      break ;
    case "show" :
      contents.push(
        <div className="show-memo">
          <p className="title">{ props.selectMemo.title }</p>
          <p className="content">{ props.selectMemo.content }</p>
          <div className="dates">
            <p className="created_date">from:{ props.selectMemo.created_at }</p>
            <p className="updated_date">last:{ props.selectMemo.updated_at}</p>
          </div>
          <div className="edits">
            <div className="modify" onClick={ props.changeToModifyMode }>修正</div>
            <div className="delete" onClick={ props.deleteMemo }>削除</div>
          </div>
        </div>
      );
      break ;
      case "modify":
        contents.push(
          <div className="modify-memo">
            <input
              type="text"
              className="modify-title"
              value={ props.modify_data_title }
              placeholder="title..."
              onChange={ props.modifyTitle }
            />
            <textarea
              className="modify-content"
              onChange={ props.modifyContent }
              placeholder="content..."
            >{ props.modify_data_content }</textarea>
            <input
              type="button"
              value="修正"
              className="modify-memo"
              onClick={ props.modifyMemo }
            />
          </div>
        );
        break ;
  }

  return(
    <div className="centerbar">
      { contents }
    </div>
  );
}
function RightSideBar (props){
  return(
    <div className="right-sidebar">
    </div>
  );
}
export default class MemoContent extends Component {
    constructor(props){
      super(props);
      this.state={
        app_mode: "prev" ,
        old_mode: "prev" ,
        memo_datas: [] ,
        show_memo_data: {} ,
        create_data_title: "" ,
        create_data_content: "",
        modify_data_id : 0 ,
        modify_data_title: "" ,
        modify_data_content: "" ,
        searchTarget: ""
      };
      //function binding
      this.getCurrentMemos = this.getCurrentMemos.bind(this);
      this.changeToCreateMode = this.changeToCreateMode.bind(this);
      this.changeToSearchMode = this.changeToSearchMode.bind(this);
      this.inputNewTitle = this.inputNewTitle.bind(this);
      this.inputNewContent = this.inputNewContent.bind(this);
      this.createNewMemo = this.createNewMemo.bind(this);
      this.showMemo = this.showMemo.bind(this);
      this.backToPrev = this.backToPrev.bind(this);
      this.showMemo = this.showMemo.bind(this);
      this.deleteMemo = this.deleteMemo.bind(this);
      this.modifyMemo = this.modifyMemo.bind(this);
      this.changeToModifyMode = this.changeToModifyMode.bind(this);
      this.modifyTitle = this.modifyTitle.bind(this);
      this.modifyContent = this.modifyContent.bind(this);
    }

    //Communicate Server and Get Current Memo Datas
    //
    //
    getCurrentMemos(){
      $.ajax({
        url:'/getMemos' ,
        type:'GET' ,
      })
      .done( data=>{
        const memo_datas = JSON.parse( data );
        this.setState({
          memo_datas: memo_datas
        });
        console.log("Initialize Communication End");
      })
      .fail( data=>{
        console.log("fail");
      });
    }

    //Initialize Ajax Communication
    //
    //
    componentWillMount(){
      console.log("Initialize Communication Start");
        $.ajaxSetup({
          headers:{
            'X-CSRF-TOKEN' : $('meta[name="csrf-token"]').attr('content')
          }
        });
        this.getCurrentMemos();
    }

    inputNewTitle(e){
      this.setState({
        create_data_title: e.target.value
      });
    }

    inputNewContent(e){
      this.setState({
        create_data_content: e.target.value
      });
    }

    modifyTitle(e){
      this.setState({
        modify_data_title: e.target.value
      });
    }

    modifyContent(e){
      this.setState({
        modify_data_content: e.target.value
      });
    }

    //
    changeToCreateMode(){
        this.setState({
          old_mode: this.state.app_mode ,
          app_mode: "create"
        });
    }

    changeToSearchMode(e){
      let search = e.target.value ;

      this.setState({
        searchTarget: search.trim()
      });

      if( search.trim().length > 0 ){
        if( this.state.app_mode !== "search_prev"){
          this.setState({
            old_mode: this.state.app_mode ,
            app_mode: "search_prev"
          });
        }
      }else{
        this.setState({
          app_mode: "prev" ,
        });
      }
    }

    changeToModifyMode(){
      this.setState({
        modify_data_id : this.state.show_memo_data.id ,
        modify_data_title : this.state.show_memo_data.title ,
        modify_data_content : this.state.show_memo_data.content ,
        old_mode: this.state.app_mode ,
        app_mode: "modify"
      });

    }

    //Back to Prev Display
    backToPrev(){
      this.setState({
        app_mode : this.state.old_mode
      });
    }

    //Show Select Memo Data from Prev
    showMemo(e){
      const id = +e.currentTarget.dataset.id ;
      const pos = this.state.memo_datas.map( memo_data =>{
        return memo_data.id ;
      }).indexOf( id );

      this.setState({
        old_mode: this.state.app_mode ,
        app_mode: "show" ,
        show_memo_data: this.state.memo_datas[pos]
      });
    }

    //
    createNewMemo(){
      const title = this.state.create_data_title ;
      const content =  this.state.create_data_content;

      if( title.trim().length < 1 ||
          content.trim().length < 1 ){
        return ;
      }

      $.ajax({
        url:'/createMemo' ,
        type:'POST' ,
        data:{
          title: title.trim() ,
          content: content.trim() ,
          tags: []
        }
      })
      .done( data=>{
        // console.log( data ) ;
        this.getCurrentMemos();
        this.setState({
          app_mode: "prev" ,
          create_data_title : "" ,
          create_data_content: ""
        });
      })
      .fail( data=>{
        // console.log( data );
      });
    }

    //
    modifyMemo(){
      const id = this.state.modify_data_id ;
      const title = this.state.modify_data_title ;
      const content =  this.state.modify_data_content;

      if( title.trim().length < 1 ||
          content.trim().length < 1 ){
        return ;
      }

      $.ajax({
        url:'/modifyMemo' ,
        type:'POST' ,
        data:{
          id : id ,
          title: title.trim() ,
          content: content.trim() ,
          tags: []
        }
      })
      .done( data=>{
        this.getCurrentMemos();
        this.setState({
          app_mode: "prev" ,
          modify_data_id : 0 ,
          modify_data_title: "",
          modify_data_content: "" ,
          searchTarget : ""
        });
      })
      .fail( data=>{
        // console.log( data );
      });
    }

    deleteMemo(){
      $.ajax({
        url:'/deleteMemo' ,
        type:'POST' ,
        data:{
          id: this.state.show_memo_data.id
        }
      })
      .done( data=>{
        // console.log( data ) ;
        this.getCurrentMemos();
        this.setState({
          app_mode : "prev" ,
          searchTarget : ""
        });
      })
      .fail( data=>{
        // console.log( data );
      });
    }

    render() {
        return (
            <div className="memo-container">
              <AppHeader
                changeToCreateMode={ this.changeToCreateMode }
                changeToSearchMode={ this.changeToSearchMode }
                searchTarget={ this.state.searchTarget }
              />
              <div className="app-body">
                <LeftSideBar
                  app_mode={ this.state.app_mode }
                  backToPrev={ this.backToPrev }
                />
                <CenterBar
                  app_mode={ this.state.app_mode }
                  memo_datas={ this.state.memo_datas }
                  create_data_title={ this.state.create_data_title }
                  create_data_content={ this.state.create_data_content }
                  inputNewTitle={this.inputNewTitle}
                  inputNewContent={this.inputNewContent}
                  createNewMemo={ this.createNewMemo }
                  showMemo={ this.showMemo }
                  selectMemo={ this.state.show_memo_data }
                  deleteMemo={ this.deleteMemo }
                  modifyMemo={this.modifyMemo }
                  changeToModifyMode={ this.changeToModifyMode }
                  modify_data_id={ this.state.modify_data_id }
                  modify_data_title={ this.state.modify_data_title }
                  modify_data_content={this.state.modify_data_content }
                  modifyTitle={ this.modifyTitle }
                  modifyContent={ this.modifyContent }
                  searchTarget={ this.state.searchTarget }
                />
                <RightSideBar
                  app_mode={ this.state.app_mode}
                  old_mode={ this.state.old_mode }
                />
              </div>
            </div>
        );
    }
}

if (document.getElementById('content')) {
    ReactDOM.render(<MemoContent />, document.getElementById('content'));
}
