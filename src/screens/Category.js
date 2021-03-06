import React, {Component} from 'react';
import {View, Text, FlatList, ActivityIndicator, RefreshControl} from 'react-native';
import Header from '../components/common/Header';
import axios from 'axios';
import ItemDetail from '../components/common/ItemDetail';


class Category extends Component {
    constructor(props){
        super(props);

        this.state = {
            loading: true
        };
        this.GetData();
    }

    GetData = () => {
        let id = this.props.navigation.getParam('id', 0)
        return axios.get('http://unicore.ir/t/Takhfiman/0.1/Data/generators/category.php?id=' + id)
          .then(response => 
            {
                this.setState({
                    loading: false,
                    dataSource: response.data
                });
                console.log(id)
            }).catch(error => {
                alert(error);
            })
    }

    renderHeader = () => {
        return <Header headerText={this.props.navigation.getParam('cat_name','دسته بندی')} navigation={this.props.navigation}/>
    }

    onRefresh() {
        //Clear old data of the list
        this.setState({ dataSource: [] });
        //Call the Service to get the latest data
        this.GetData();
    }


    render(){
        console.log(this.state.loading + ": " + this.state.dataSource)
        if(this.state.loading === true)
        {
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <ActivityIndicator />
                </View>
            );
        }
        else
        {
            if(this.state.dataSource.length > 0)
            {
                return(
                    <View style={{flex: 1}}>
                        <FlatList
                            ListHeaderComponent={this.renderHeader}
                            data={this.state.dataSource}
                            enableEmptySections={true}
                            keyExtractor = {i => i.id.toString()}
                            renderItem={({item}) => <ItemDetail item={item} key={item.id} navigation={this.props.navigation} />}
                            // renderItem={({item}) => <Text>Hi</Text>}
                            refreshControl={
                                <RefreshControl
                                //refresh control used for the Pull to Refresh
                                refreshing={this.state.loading}
                                onRefresh={this.onRefresh.bind(this)}
                                />
                            }
                            />
                    </View>
                )
            }
            else
            {
                return(
                    <View style={{flex: 1}}>
                        {this.renderHeader()}
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 1
                        }}>
                            <Text>این دسته بندی خالی است</Text>
                        </View>
                    </View>
                )
            }
        }
    }
}

export { Category };