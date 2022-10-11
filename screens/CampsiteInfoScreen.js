import { FlatList, StyleSheet, Text, View, Button, Modal } from "react-native";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import RenderCampsite from "../features/campsites/RenderCampsite";
import { toggleFavorite } from "../features/favorites/favoritesSlice";
import { ScreenStackHeaderBackButtonImage } from "react-native-screens";
import { Input } from "react-native-elements";
import { SafeAreaInsetsContext } from "react-native-safe-area-context";

const CampsiteInfoScreen = ({ route }) => {
  const { campsite } = route.params;
  const comments = useSelector((state) => state.comments);
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    const newComment = {
      author,
      rating,
      text,
      campsiteId: campsite.id,
    };
    console.log(newComment);
    setShowModal(!showModal);
  };

  const resetForm = () => {
    setAuthor("");
    setRating(5);
    setText("");
  };

  const [showModal, setShowModal] = useState(false);

  const renderCommentItem = ({ item }) => {
    return (
      <View style={styles.commentItem}>
        <Text style={{ fontSize: 14 }}>{item.text}</Text>
        <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
        <Text style={{ fontSize: 12 }}>
          {`-- ${item.author}, ${item.date}`}
        </Text>
      </View>
    );
  };

  return (
    <>
      <FlatList
        data={comments.commentsArray.filter(
          (comment) => comment.campsiteId === campsite.id
        )}
        renderItem={renderCommentItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
          marginHorizontal: 20,
          paddingVertical: 20,
        }}
        ListHeaderComponent={
          <>
            <RenderCampsite
              campsite={campsite}
              isFavorite={favorites.includes(campsite.id)}
              markFavorite={() => dispatch(toggleFavorite(campsite.id))}
              onShowModal={() => setShowModal(!showModal)} // Where does this event handler go?? task 1
            />
            <Text style={styles.commentsTitle}>Comments</Text>
          </>
        }
      />
      <Modal // Created for task 1
        animationType="slide"
        transparent={false}
        visible={showModal}
        onRequestClose={() => setShowModal(!showModal)}
        rating="5"
        author=""
        text=""
      >
        <View style={styles.modal}>
          <Rating
            showRating
            startingValue=""
            imageSize="40"
            onFinishRating={(rating) => setRating(rating)}
            style={{ paddingVertical: 10 }}
          ></Rating>
          <Input
            placeholder="Author"
            leftIcon={{ type: "font-awesome", name: "user-o" }}
            leftIconContainerStyle={{ paddingRight: 10 }}
            onChangeText
            value
          ></Input>
          <Input
            placeholder="Comment"
            leftIcon={{ type: "font-awesome", name: "comment-o" }}
            leftIconContainerStyle={{ paddingRight: 10 }}
            onChangeText
            value
          ></Input>
          <View style={{ margin: 10 }}>
            <Button
              title="Submit"
              color="#5637DD"
              onPress={() => {
                handleSubmit();
                resetForm();
              }}
            ></Button>
          </View>
          <View style={{ margin: 10 }}>
            <Button
              onPress={() => {
                setShowModal(!showModal);
                resetForm();
              }}
              color="#808080"
              title="Cancel"
            ></Button>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  commentsTitle: {
    textAlign: "center",
    backgroundColor: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    color: "#43484D",
    padding: 10,
    paddingTop: 30,
  },
  commentItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  modal: {
    justifyContent: "center",
    margin: 20,
  },
});

export default CampsiteInfoScreen;
