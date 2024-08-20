import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
const AuthorItems = () => {
  const [authorItems, setAuthorItems] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  useEffect(() => {
    axios
      .get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
      )
      .then((response) => {
        setAuthorItems(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {authorItems && (
            <div>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link to="">
                    <img
                      className="lazy"
                      src={authorItems.authorImage}
                      alt=""
                    />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <Link to="/item-details">
                    <img
                      src={authorItems.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
                    <h4>{authorItems.title}</h4>
                  </Link>
                  <div className="nft__item_price">{authorItems.price}</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{authorItems.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
