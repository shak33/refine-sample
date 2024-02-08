import {
  useShow,
  IResourceComponentsProps,
  useOne,
} from "@refinedev/core";
import {
  Show,
  NumberField,
  TextFieldComponent as TextField,
  MarkdownField,
  DateField,
} from "@refinedev/mui";
import { Typography, Stack } from "@mui/material";

export const ShowPostPage: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const { data: categoryData, isLoading: categoryIsLoading } = useOne({
      resource: "categories",
      id: record?.category?.id || "",
      queryOptions: {
          enabled: !!record,
      },
  });

  const { data: userData, isLoading: userIsLoading } = useOne({
      resource: "users",
      id: record?.user?.id || "",
      queryOptions: {
          enabled: !!record,
      },
  });

  return (
      <Show isLoading={isLoading}>
          <Stack gap={1}>
              <Typography variant="body1" fontWeight="bold">
                  Id
              </Typography>
              <NumberField value={record?.id ?? ""} />
              <Typography variant="body1" fontWeight="bold">
                  Title
              </Typography>
              <TextField value={record?.title} />
              <Typography variant="body1" fontWeight="bold">
                  Slug
              </Typography>
              <TextField value={record?.slug} />
              <Typography variant="body1" fontWeight="bold">
                  Content
              </Typography>
              <MarkdownField value={record?.content} />
              <Typography variant="body1" fontWeight="bold">
                  Hit
              </Typography>
              <NumberField value={record?.hit ?? ""} />
              <Typography variant="body1" fontWeight="bold">
                  Category
              </Typography>
              {categoryIsLoading ? (
                  <>Loading...</>
              ) : (
                  <>{categoryData?.data?.title}</>
              )}
              <Typography variant="body1" fontWeight="bold">
                  User
              </Typography>
              {userIsLoading ? (
                  <>Loading...</>
              ) : (
                  <>
                      {userData?.data?.firstName +
                          " " +
                          userData?.data?.lastName}
                  </>
              )}
              <Typography variant="body1" fontWeight="bold">
                  Status
              </Typography>
              <TextField value={record?.status} />
              <Typography variant="body1" fontWeight="bold">
                  Created At
              </Typography>
              <DateField value={record?.createdAt} />
              <Typography variant="body1" fontWeight="bold">
                  Published At
              </Typography>
              <DateField value={record?.publishedAt} />
          </Stack>
      </Show>
  );
};
